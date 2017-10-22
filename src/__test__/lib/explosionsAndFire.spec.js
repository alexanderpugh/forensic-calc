import {
  heatOfExplosion,
  explosivePower,
  explosivePowerIndex
} from '../../lib/explosionsAndFire';

describe('heatOfExplosion', () => {
  test('Should return the heat of Explosion when the enthalpy of detonation and molecular weight are provied as arguments', () => {
    expect(heatOfExplosion(123.12, 443.32)).toBe(277.7227);
  });
});

describe('explosivePower', () => {
  test('Should return the explosive power when the heat of explosion and the explosive volume are provied as arguments', () => {
    expect(explosivePower(23.92, 2342.32)).toBe(56028.2945);
  });
})

describe('explosivePowerIndex', () => {
  test('Should return the explosive power index when the heat of explosion, the explosive volume, the heat of detonation of picric acid and the explosive volume of picric acide are provided as arguments', () => {
    expect(explosivePowerIndex(12.12, 4.42, 424.23, 42.42)).toBe(0.0682);
  });
});
