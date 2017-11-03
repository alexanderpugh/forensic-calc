import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Container, Row, Col, Button, Panel } from '../components/Bootstrap';
import NumberInput from '../components/NumberInput';
import { explosivePower } from '../lib/explosionsAndFire';

class ExplosivePower extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.getDefaultState();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  getDefaultState() {
    return {
      heatOfExplosion: 0,
      explosiveVolume: 0,
      calculated: false,
      result: 0
    };
  }

  reset() {
    this.setState(this.getDefaultState());
  }

  handleInputChange(e) {
    this.setState({
      calculated: false,
      [e.target.name]: e.target.value
    });
  }

  calculate() {
    this.setState({
      calculated: true,
      result: explosivePower(_.toNumber(this.state.heatOfExplosion), _.toNumber(this.state.explosiveVolume))
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Explosive Power</h1>
          </Col>
        </Row>
        <Row>
          <Col medium="6" large="6">
            <NumberInput value={this.state.enthalpyOfDetonation} label="Heat of Explosion" name="heatOfExplosion" onChange={this.handleInputChange}>KjKg<sup>-1</sup></NumberInput>
          </Col>
          <Col medium="6" large="6">
            <NumberInput value={this.state.molecularWeight} label="Explosive Volume" name="explosiveVolume" onChange={this.handleInputChange}>dm<sup>-3</sup>g<sup>-1</sup></NumberInput>
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
                <p>{this.state.result}</p>
                <pre>
                  <b>Steps</b>
                  <ul>
                    <li>Explosive Power = heat of explosion * explosive volume</li>
                    <li>Explosive Power = {this.state.heatOfExplosion} * {this.state.explosiveVolume}</li>
                    <li>Explosive Power = {this.state.result}</li>
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

export default ExplosivePower;
