import math from 'mathjs';
import _ from 'lodash';

/**
 * calculate concentration using single point estimation
 *
 * @param {object} details - information about the calculation
 * @param {object} standard - information about the standard
 * @param {object} analyte - information about the analyte
 * @throws Will throw an error if the arguments are not greater than 0
 * @return {number} the calculated concentration
 */
export const singlePointEstimation = (details, standard, analyte) => {
  let conc;
  if (details.useInternalStandard) {
    const standardAreaRatio = areaRatio(standard.yStandard, standard.yInternal);
    const analyteAreaRatio = areaRatio(analyte.yStandard, analyte.yInternal);
    conc = concentration(analyteAreaRatio, standard.concentration, standardAreaRatio);
  } else {
    conc = concentration(analyte.yStandard, standard.concentration, standard.yStandard);
  }

  if (_.isNaN(conc)) {
    throw new Error('ERROR: Invalid input - arguments must be non-zero numbers');
  }

  return _.ceil(conc, 4);
};

/**
 * calculate the area/height ratio
 *
 * @param {number} yStandard
 * @param {number} yInternal
 * @return {number} the area ratio
 */
export const areaRatio = (yStandard, yInternal) => math.chain(yStandard).divide(yInternal).done();

/**
 * calculate the concentration
 *
 * @param {number} analyteYorAreaRatio
 * @param {number} standardConcentration
 * @param {number} divider
 * @return {number} the concentration
 */
export const concentration = (analyteYorAreaRatio, standardConcentration, divider) => {
  return math.chain(analyteYorAreaRatio).multiply(standardConcentration).divide(divider).round(4).done()
};
