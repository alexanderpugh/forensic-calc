import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Container, Row, Col, Button, Panel } from '../components/Bootstrap';
import NumberInput from '../components/NumberInput';
import { heatOfExplosion } from '../lib/explosionsAndFire';

class HeatOfExplosion extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.getDefaultState();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  reset() {
    this.setState(this.getDefaultState());
  }

  calculate() {
    this.setState({
      calculated: true,
      result: heatOfExplosion(_.toNumber(this.state.enthalpyOfDetonation), _.toNumber(this.state.molecularWeight))
    });
  }

  getDefaultState() {
    return {
      enthalpyOfDetonation: 0,
      molecularWeight: 0,
      calculated: false,
      result: 0
    };
  }

  handleInputChange(e) {
    this.setState({
      calculated: false,
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Heat of Explosion</h1>
          </Col>
        </Row>
        <Row>
          <Col medium="6" large="6">
            <NumberInput value={this.state.enthalpyOfDetonation} label="Enthalpy of Detonation" name="enthalpyOfDetonation" onChange={this.handleInputChange}>Kjmol<sup>-1</sup></NumberInput>
          </Col>
          <Col medium="6" large="6">
            <NumberInput value={this.state.molecularWeight} label="Molecular Weight" name="molecularWeight" onChange={this.handleInputChange}>gmol<sup>-1</sup></NumberInput>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <Button text="CACLCULATE" onClick={this.calculate} size="xl" type="info" />
            <Button text="RESET" onClick={this.reset} size="xl" type="warning" />
            <Link to="/" className="btn btn-xl btn-danger">CANCEL</Link>
          </Col>
        </Row>
        {this.state.calculated &&
          <Row>
            <Col>
              <Panel type="success" title="Result">
                <p>{this.state.result} kjkg<sup>-1</sup></p>
                <pre>
                  <b>Steps</b>
                  <ul>
                    <li>Heat of explosion = (enthalpy of detonation * 1000) / molecular weight</li>
                    <li>Heat of explosion = ({this.state.enthalpyOfDetonation} * 1000) / {this.state.molecularWeight}</li>
                    <li>Heat of explosion = {this.state.result}</li>
                    <li>(Kjmol<sup>-1</sup> * 1000) / gmol<sup>-1</sup> = kjkg<sup>-1</sup></li>
                  </ul>
                </pre>
              </Panel>
            </Col>
          </Row>
        }
      </Container>
    );
  }
}

export default HeatOfExplosion;
