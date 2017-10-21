import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Container, Row, Col, Button, Panel, CheckBox } from '../components/Bootstrap';
import NumberInput from '../components/NumberInput';
import { singlePointEstimation } from '../lib/singlePointEstimation';

/**
 * Class representing the single point estimation page
 *
 * @extends React.Component
 */
class SinglePointEstimation extends React.Component {

  /**
   * Create a SinglePointEstimation component
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  /**
   * Creates the default component state
   *
   * @return {object}
   */
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
      calculationComplete: false
    };
  }

  /**
   * Handle switching between use internal standard true and false
   *
   * @param {object} event
   */
  handleInternalStandardCheckChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ useInternalStandard: value });
  }

  /** Trigger the calculation */
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
      calculationComplete: true
    }));
  }

  /**
   * Reset the state of the component
   *
   * @param {object} event
   */
  handleClearButtonClick(event) {
    this.setState(this.getDefaultState);
  }

  /**
   * Handle changing the value of the number inputs
   *
   * @param {string} substance - analyte or standard
   * @param {string} property - the object property being edited
   * @param {object} event - the js event object
   */
  handleInputChange(substance, property, event) {
    const value = event.target.value;
    this.setState(prev => ({
      [substance]: {
        ...prev[substance],
        [property]: _.toNumber(value)
      }
    }));
  }

  /** Render the component */
  render() {
    return (
      <Container>
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

            {this.state.calculationComplete ?
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
