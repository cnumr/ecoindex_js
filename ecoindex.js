export const quantiles = {
  dom: [0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459, 1801, 2479, 594601],
  req: [0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281, 3920],
  size: [0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32, 1648.27, 1876.08, 2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54, 223212.26],
}

/**
 * Eco index ranges.
 * @type {[{name: string, value: number},{name: string, value: number},{name: string, value: number},{name: string, value: number},{name: string, value: number},null,null]}
 */
export const ecoIndexRanges = [
  {value: 80, name: 'A'},
  {value: 70, name: 'B'},
  {value: 55, name: 'C'},
  {value: 40, name: 'D'},
  {value: 25, name: 'E'},
  {value: 10, name: 'F'},
  {value: 0, name: 'G'},
];

/**
 * Compute ecoIndex based on formula from web site www.ecoindex.fr
 * @param {number}  dom     Number of elements in DOM.
 * @param {number}  req     Number of requests.
 * @param {number}  size    Size of request.
 * @returns {number} EcoIndex value.
 */
export function computeEcoIndex(dom, req, size) {
  const q_dom = computeQuantile(quantiles.dom, dom);
  const q_req = computeQuantile(quantiles.req, req);
  const q_size = computeQuantile(quantiles.size, size);

  return 100 - 5 * (3 * q_dom + 2 * q_req + q_size) / 6;
}

/**
 * Get quantile index for given quantiles list and value.
 *
 * @param {number[]}  quantiles   Quantiles list.
 * @param {number}    value       Value.
 * @returns {number}  Quantile index.
 */
export function computeQuantile(quantiles, value) {
  for (let i = 1; i < quantiles.length; i++) {
    if (value < quantiles[i]) return (i - 1 + (value - quantiles[i - 1]) / (quantiles[i] - quantiles[i - 1]));
  }
  return quantiles.length - 1;
}

/**
 * Return the grade associated to the ecoIndex value.
 * @param {number}    ecoIndex   The ecoIndex value.
 * @returns {string}  The associated grade.
 */
export function getEcoIndexGrade(ecoIndex) {
  let name = false, i = 0;
  do {
    if (ecoIndex > ecoIndexRanges[i].value) {
      name = ecoIndexRanges[i].name;
    }
  } while (name === false && i++ < ecoIndexRanges.length);

  return name;
}

/**
 * Get gases emission from EcoIndex value.
 * @param {number} ecoIndex   The ecoIndex value.
 * @returns {string}  The gas emission.
 */
export function computeGreenhouseGasesEmissionfromEcoIndex(ecoIndex) {
  return (2 + 2 * (50 - ecoIndex) / 100).toFixed(2);
}

/**
 * Get water consumption from EcoIndex value.
 * @param {number}  ecoIndex  The ecoIndex value.
 * @returns {string}  The water consumption.
 */
export function computeWaterConsumptionfromEcoIndex(ecoIndex) {
  return (3 + 3 * (50 - ecoIndex) / 100).toFixed(2);
}
