declare module "str-utils" {
  // export const ...
  // export function ...
  type strUtils = (value: string) => string;
  export const strReverse: strUtils;
  export const strToLower: strUtils;
  export const strToUpper: strUtils;
  export const strRandomize: strUtils;
  export const strInvertCase: strUtils;
}
