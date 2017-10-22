import _ from 'lodash';
import math from 'mathjs';

/**
 * Caclulate the heat of explosion
 *
 * @param {number} enthalpyOfDetonation
 * @param {number} molecularWeight
 * @return {number}
 */
export const heatOfExplosion = (enthalpyOfDetonation, molecularWeight) => _.ceil(math.chain(enthalpyOfDetonation * 1000).divide(molecularWeight).done(), 4);

/**
 * Calculate the explosive power
 *
 * @param {number} heatOfExp - the heat of explosion
 * @param {number} explosivePower
 * @return {number}
 */
export const explosivePower = (heatOfExp, explosivePower) => _.ceil(heatOfExp * explosivePower, 4);

/**
 * Caclulate the explosive power index
 *
 * @param {number} heatOfExp
 * @param {number} explosiveVolume
 * @param {number} heatOfDetOfPicricAcid
 * @param {number} explosiveVolumeOfPicricAcid
 * @return {number}
 */
export const explosivePowerIndex = (heatOfExp, explosiveVolume, heatOfDetOfPicricAcid, explosiveVolumeOfPicricAcid) =>
  _.ceil(math.chain(heatOfExp * explosiveVolume * 100).divide(heatOfExplosion(heatOfDetOfPicricAcid, 229.1) * explosiveVolumeOfPicricAcid).done(), 4);
