declare module "stats" {
  type compare<T> = (a: T, b: T) => number;

  type getIndex = <T>(input: T[], comparator: compare<T>) => number;
  export const getMaxIndex: getIndex;
  export const getMinIndex: getIndex;
  export const getMedianIndex: getIndex;

  type getElement = <T>(input: T[], comparator: compare<T>) => T | null;
  export const getMaxElement: getElement;
  export const getMinElement: getElement;
  export const getMedianElement: getElement;

  type getAverage<T> = (item: T) => number;
  export const getAverageValue: <T>(
    input: T[],
    getValue: getAverage<T>
  ) => number | null;
}
