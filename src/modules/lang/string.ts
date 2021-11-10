export const toCamelCase = (str: string) =>
  str.replace(/_[a-z]/g, (match) => match.slice(1).toUpperCase())
