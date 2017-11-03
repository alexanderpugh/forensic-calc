import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Container, Row, Col, Button, Panel, CheckBox } from '../components/Bootstrap';
import NumberInput from '../components/NumberInput';
import { singlePointEstimation } from '../lib/singlePointEstimation';

class SinglePointEstimation extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      useInternalStandard: false,
      standard: {
        concentration: 0,
        yStandard: 0,
        yInternal: 0
      },
      analyte: {
        concentration: 0,
        yStandard: 0,
        yInternal: 0
      },
      calculated: false
    };
  }

  handleInternalStandardCheckChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ useInternalStandard: value, calculated: false });
  }

  handleCalculateButtonClick() {
    let concentration;
    try {
      concentration = singlePointEstimation(
        { useInternalStandard: this.state.useInternalStandard },
        this.state.standard,
        this.state.analyte
      );
    } catch (e) {
      console.warn('User left 0s in the number inputs');
      return;
    }

    this.setState(prev => ({
      analyte: {
        ...prev.analyte,
        concentration
      },
      calculated: true
    }));
  }

  handleClearButtonClick(event) {
    this.setState(this.getDefaultState());
  }

  handleInputChange(substance, property, event) {
    const value = event.target.value;
    this.setState(prev => ({
      [substance]: {
        ...prev[substance],
        [property]: _.toNumber(value)
      },
      calculated: false
    }));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col><h1>Single Point Estimation</h1></Col>
        </Row>
        <Row>
          <Col>
            <CheckBox text="Use internal standard" checked={this.state.useInternalStandard} onChange={this.handleInternalStandardCheckChange.bind(this)} />
          </Col>
          <Col medium="6" large="6">
            <h3>Standard</h3>
            <NumberInput label="Standard Concentration" value={this.state.standard.concentration} onChange={this.handleInputChange.bind(this, 'standard', 'concentration')} />
            <NumberInput label="Standard Peak Area/Height" value={this.state.standard.yStandard} onChange={this.handleInputChange.bind(this, 'standard', 'yStandard')} />
            {this.state.useInternalStandard ?
              <NumberInput label="Internal Standard Peak Height" value={this.state.standard.yInternal} onChange={this.handleInputChange.bind(this, 'standard', 'yInternal')} />
              : ''}
          </Col>
          <Col medium="6" large="6">
            <h3>Analyte</h3>
            <NumberInput label="Analyte Peak Area/Height" value={this.state.analyte.yStandard} onChange={this.handleInputChange.bind(this, 'analyte', 'yStandard')} />
            {this.state.useInternalStandard ?
              <NumberInput label="Internal Standard Peak Height" value={this.state.analyte.yInternal} onChange={this.handleInputChange.bind(this, 'analyte', 'yInternal')} />
              : ''}
          </Col>
          <Col>
            <Button text="CALCULATE" onClick={this.handleCalculateButtonClick.bind(this)} size="xl" type="info" />
            <Button text="RESET" onClick={this.handleClearButtonClick.bind(this)} size="xl" type="warning" />
            <Link to="/" className="btn btn-xl btn-danger">CANCEL</Link>

            {this.state.calculated ?
              <Panel type="success" title="Analyte Concentration">
                {this.state.analyte.concentration}
              </Panel>
              : ''}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SinglePointEstimation;
