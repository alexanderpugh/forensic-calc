import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Container, Row, Col, Button, Panel, CheckBox } from '../components/Bootstrap';
import NumberInput from '../components/NumberInput';
import { linearRegression, ratioY } from '../lib/linearRegression';

class LinearRegression extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.getDefaultState();

    this.addNewXY = this.addNewXY.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.calculate = this.calculate.bind(this);
    this.removeXY = this.removeXY.bind(this);
    this.reset = this.reset.bind(this);
    this.ratioKnownToogle = this.ratioKnownToogle.bind(this);
    this.changePrepareConcInputValue = this.changePrepareConcInputValue.bind(this);
  }

  createDefaultXY() {
    return { x: 0, y: 0 };
  }

  getDefaultState() {
    return {
      standards: [this.createDefaultXY()],
      samples: [this.createDefaultXY()],
      ratioKnown: true,
      calculated: false,
      preparedAt: 1,
      result: 0
    };
  }

  changeInputValue(e) {
    const target = e.target;
    const [stateProp, arrayProp, index, subValue = null] = target.name.split(':');

    const copy = [...this.state[stateProp]];
    if (_.isNull(subValue)) {
      copy[_.toNumber(index)][arrayProp] = _.toNumber(target.value);
    } else {
      copy[_.toNumber(index)][arrayProp][subValue] = _.toNumber(target.value);
    }

    this.setState({
      [stateProp]: copy,
      calculated: false
    });
  }

  addNewXY(e) {
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: [...this.state[name], this.createDefaultXY()],
      calculated: false
    });
  }

  removeXY(e) {
    const target = e.target;
    const [stateProp, index] = target.name.split(':');

    this.setState({
      [stateProp]: this.state[stateProp].filter((el, i) => i !== _.toNumber(index)),
      calculated: false
    });
  }

  ratioKnownToogle() {
    const setXY = (x = 0, y = 0) => ({ x, y });

    const createXYArray = (array) => {
      return array.map(el => {
        return this.state.ratioKnown ? setXY(el.x, { height: 0, interStandHeight: 0 }) : setXY(el.x)
      })
    };

    this.setState({
      standards: createXYArray(this.state.standards),
      samples: createXYArray(this.state.samples),
      ratioKnown: !this.state.ratioKnown,
      calculated: false
    });
  }

  reset() {
    this.setState(this.getDefaultState);
  }

  changePrepareConcInputValue(e) {
    this.setState({
      preparedAt: _.toNumber(e.target.value),
      calculated: false
    });
  }

  calculateResult() {
    if (this.state.ratioKnown) {
      return linearRegression(this.state.standards, this.state.samples, this.state.preparedAt);
    }

    const getResult = (array) => ratioY(array, 'height', 'interStandHeight');
    return linearRegression(getResult(this.state.standards), getResult(this.state.samples), this.state.preparedAt);
  }

  calculate() {
    this.setState({
      calculated: true,
      result: this.calculateResult()
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col><h1>Linear Regression</h1></Col>
        </Row>
        <div className="panel panel-info">
          <div className="panel-heading">
            <b>Setup</b>
          </div>
          <div className="panel-body">
            <Row>
              <Col medium="6" large="6">
                <CheckBox text="Height/Area Ratio Known" onChange={this.ratioKnownToogle} checked={this.state.ratioKnown} />
              </Col>
              <Col medium="6" large="6">
                <NumberInput label="Standards Prepared at" min="1" onChange={this.changePrepareConcInputValue} value={this.state.preparedAt} />
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <Col medium="6" large="6">
            <h3>Standards</h3>
            {this.state.standards.map((std, i) =>
              <div key={i} className="well">
                <Row>
                  <Col medium="6" large="6">
                    <NumberInput value={std.x} name={'standards:x:' + i} onChange={this.changeInputValue} label="Concentration" />
                  </Col>
                  {this.state.ratioKnown ?
                    <Col medium="6" large="6">
                      <NumberInput value={std.y} name={'standards:y:' + i} onChange={this.changeInputValue} label="Peak Height/Area Ratio" />
                    </Col> :
                    <div>
                      <Col medium="3" large="3">
                        <NumberInput value={std.y.height} name={'standards:y:' + i + ':height'} onChange={this.changeInputValue} label="Height/Area" />
                      </Col>
                      <Col medium="3" large="3">
                        <NumberInput value={std.y.interStandHeight} name={'standards:y:' + i + ':interStandHeight'} onChange={this.changeInputValue} label="IS Height/Area" />
                      </Col>
                    </div>
                  }
                  <Col medium="2" large="2">
                    <Button onClick={this.removeXY} name={'standards:' + i} text="REMOVE" size="xs" type="danger" disabled={i === 0} />
                  </Col>
                </Row>
              </div>
            )}
            <Button name="standards" onClick={this.addNewXY} size="sm" text="ADD NEW" />
          </Col>
          <Col medium="6" large="6">
            <h3>Sample Runs</h3>
            {this.state.samples.map((std, i) =>
              <div key={i} className="well">
                <Row>
                  {this.state.ratioKnown ?
                    <Col>
                      <NumberInput value={std.y} name={'samples:y:' + i} onChange={this.changeInputValue} label="Peak Height/Area Ratio" />
                    </Col> :
                    <div>
                      <Col medium="6" large="6">
                        <NumberInput value={std.y.height} name={'samples:y:' + i + ':height'} onChange={this.changeInputValue} label="Peak Height/Area" />
                      </Col>
                      <Col medium="6" large="6">
                        <NumberInput value={std.y.interStandHeight} name={'samples:y:' + i + ':interStandHeight'} onChange={this.changeInputValue} label="IS Height/Area" />
                      </Col>
                    </div>}
                  <Col medium="2" large="2">
                    <Button onClick={this.removeXY} name={'samples:' + i} text="REMOVE" size="xs" type="danger" disabled={i === 0} />
                  </Col>
                </Row>
              </div>
            )}
            <Button name="samples" onClick={this.addNewXY} size="sm" text="ADD NEW" />
          </Col>
        </Row>
        <Row>
          <Col medium="12" large="12">
            <hr />
            <Button text="CACLCULATE" onClick={this.calculate} size="xl" type="info" />
            <Button text="RESET" onClick={this.reset} size="xl" type="warning" />
            <Link to="/" className="btn btn-xl btn-danger">CANCEL</Link>
          </Col>
        </Row>
        {this.state.calculated && <Row>
          <Panel type="success" title="Result">
            {this.state.result}
          </Panel>
        </Row>}
      </Container>
    );
  }
}

export default LinearRegression;
