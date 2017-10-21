import math from 'mathjs';
import _ from 'lodash';

/**
 * Calculate linear regression
 *
 * @param {array} standards
 * @param {array} samples
 * @param {number} preparedAt
 * @return {number} unknown x
 * @throws {Error}
 */
export const linearRegression = (standards, samples, preparedAt = 1) => {
  if (!(_.isArray(standards) && _.isArray(samples))) {
    throw new Error('ERROR: standards and samples must be arrays');
  }

  const xMean = _.meanBy(standards, el => el.x);
  const yMean = _.meanBy(standards, el => el.y);
  const stdXVar = math.var(standards.map(el => el.x));
  const stdYVar = math.var(standards.map(el => el.y));
  const xStdDev = math.sqrt(stdXVar);
  const yStdDev = math.sqrt(stdYVar);
  const aArray = standards.map(el => el.x - xMean);
  const bArray = standards.map(el => el.y - yMean);
  const abTotal = math.sum(_.zip(aArray, bArray).map(el => math.multiply(...el)));
  const a2Total = math.sum(aArray.map(el => el * el));
  const b2Total = math.sum(bArray.map(el => el * el));
  const cor = correlation(abTotal, a2Total, b2Total);
  const m = gradient(cor, yStdDev, xStdDev)
  const c = intercept(yMean, m, xMean);
  const x = (_.meanBy(samples, el => el.y) - c) / m;

  return _.ceil((x / preparedAt), 4);
};

/**
 * Calculate the gradient m
 *
 * @param {number} correlation
 * @param {number} yStdDev
 * @param {number} xStdDev
 * @return {number} the gradient
 */
export const gradient = (correlation, yStdDev, xStdDev) => correlation * (yStdDev / xStdDev);

/**
 * Calculate the intercept c
 *
 * @param {number} yMean
 * @param {number} gradient
 * @param {number} xMean
 * @return {number} the intercept
 */
export const intercept = (yMean, gradient, xMean) => yMean - (gradient * xMean);

/**
 * Calculate the correlation
 *
 * @param {number} abTotal
 * @param {number} a2Total
 * @param {number} b2Total
 * @return {number} the correlation
 */
export const correlation = (abTotal, a2Total, b2Total) => abTotal / math.sqrt(a2Total * b2Total);

/**
 * Calculate the ratio from an array of y values and return a new array
 *
 * @param {array} array
 * @param {string} yNumerator
 * @param {string} yDenominator
 * @return {array} the array with y calcualted
 */
export const ratioY = (array, yNumerator, yDenominator) => array.map(el => ({ x: el.x, y: (el.y[yNumerator] / el.y[yDenominator]) }));
