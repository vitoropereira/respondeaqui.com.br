export function combineArrays(arr1, arr2) {
  let combined = arr1.concat(arr2);
  return [...new Set(combined)];
}

export function limitText(text: string, size: number) {
  if (text.length > size) {
    return text.substr(0, size) + "...";
  }
  return text;
}
