import {
  singlePointEstimation,
  concentration,
  areaRatio
} from '../../lib/singlePointEstimation';

describe('singlePointEstimation', () => {
  test('singlePointEstimation will return an object with analyte concentration when there is no internal standard', () => {
    const concentration = singlePointEstimation(
      { useInternalStandard: false }, // details
      { yStandard: 456, concentration: 55 }, // standard
      { yStandard: 123 } // analyte
    );

    expect(concentration).toBe(14.8355);
  });

  test('singlePointEstimation will return an object with analyte concentration when there is an internal standard', () => {
    const concentration = singlePointEstimation(
      { useInternalStandard: true }, // details
      { concentration: 43.35, yInternal: 88.43, yStandard: 123.44 }, // standard
      { yStandard: 99.99, yInternal: 32.5 } // analyte
    );

    expect(concentration).toBe(95.5446);
  });

  test('singlePointEstimation will throw an error if 0 provided as arguments', () => {
    expect(() => {
      singlePointEstimation(
        { useInternalStandard: false }, // details
        { concentration: 0, yInternal: 0, yStandard: 0 }, // standard
        { yStandard: 0, yInternal: 0 } // analyte
      );
    }).toThrow();
  });
});
