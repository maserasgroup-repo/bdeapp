import * as math from "mathjs";

function computeDescriptors(energies, weightMatrix) {
  let results = [];
  math.transpose(weightMatrix).forEach(row => {
    let result = row[row.length - 1];
    energies.forEach((energy, i) => {
      let floatEnergy = parseFloat(energy);
      if (isNaN(floatEnergy)) {
        return Array(energies.length).fill(NaN);
      }
      result += row[i] * floatEnergy;
    });
    results.push(result);
  });
  return results;
}

function computeEnergies(energies, weightMatrix) {
  let column = [];
  let matrix = [];
  math.transpose(weightMatrix).forEach((row, i) => {
    matrix.push(row.slice(0, -1));
    column.push(energies[i] - row[row.length - 1]);
  });

  return math.lusolve(matrix, column);
}

export default computeDescriptors;
