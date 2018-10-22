import * as math from "mathjs";

function computeDescriptors(energies, weightMatrix) {
  let column = [];
  let matrix = [];
  math.transpose(weightMatrix).forEach((row, i) => {
    matrix.push(row.slice(0, -1));
    column.push(energies[i] - row[row.length - 1]);
  });

  return math.lusolve(matrix, column);
}

export default computeDescriptors;
