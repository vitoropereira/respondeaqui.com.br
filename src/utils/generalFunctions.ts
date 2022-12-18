export function combineArrays(arr1, arr2) {
  let combined = arr1.concat(arr2);
  return [...new Set(combined)];
}
