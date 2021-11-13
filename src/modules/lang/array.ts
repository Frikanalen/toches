// Collapses the array to the first index or returns the value if it's not an array
export const resolveToValue = <T>(value: T | T[]) =>
  Array.isArray(value) ? value[0] : value
