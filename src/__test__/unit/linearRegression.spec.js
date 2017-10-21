import { ratioY, linearRegression } from '../../lib/linearRegression';

describe('linearRegression', () => {
  test('Will return the unknown from an array of standards and one sample', () => {
    const standards = [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 15 }];
    const samples = [{ y: 10 }];
    const result = linearRegression(standards, samples);

    expect(result).toBe(2);
  });

  test('Will return the unknown from an array of standards and an array of samples', () => {
    const standards = [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 15 }, { x: 4, y: 20 }];
    const samples = [{ y: 10.5 }, { y: 11.5 }];
    const result = linearRegression(standards, samples);

    expect(result).toBe(2.2);
  });

  test('Will return the unknown from an array of standards and an array of samples when the solutions are prepared at a value different from 1', () => {
    const standards = [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 15 }, { x: 4, y: 20 }];
    const samples = [{ y: 10.5 }, { y: 11.5 }];
    const result = linearRegression(standards, samples, 3);

    expect(result).toBe(0.7334);
  });

  test('Will return the unknown from an array of standards and an array of samples using extrapolation', () => {
    const standards = [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 15 }, { x: 4, y: 20 }];
    const samples = [{ y: 25 }];
    const result = linearRegression(standards, samples);

    expect(result).toBe(5);
  });

  test('Will throw an error if arrays are not passed as arguments', () => {
    expect(() => {
      linearRegression({}, 24)
    }).toThrow();
  });
});

describe('ratioY', () => {
  test('Will return an array with y converted to a singular area/height ratio', () => {
    const standards = [{ x: 1, y: { height: 5, interStandHeight: 10 } }, { x: 2, y: { height: 10, interStandHeight: 40 } }];
    const result = ratioY(standards, 'height', 'interStandHeight');

    expect(result).toEqual([{ x: 1, y: 0.5 }, { x: 2, y: 0.25 }]);
  });
});
