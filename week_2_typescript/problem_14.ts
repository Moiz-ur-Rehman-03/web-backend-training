interface MinMapFunc<T, K> {
    (): MinMapFunc<T, K>;
    (input: T[]): K[];
  }
  
  interface MapFunc {
    (): MapFunc;
    <T, K>(mapper: (arg: T) => K): MinMapFunc<T, K>;
    <T, K>(mapper: (arg: T) => K, input: T[]): K[];
  }
  
  interface MinFilterFunc<T> {
    (): MinFilterFunc<T>;
    (input: T[]): T[];
  }
  
  interface FilterFunc {
    (): FilterFunc;
    <T, K>(filterer: (arg: T) => boolean): MinFilterFunc<T>;
    <T, K>(filterer: (arg: T) => boolean, input: T[]): T[];
  }
  
  interface ThirdReducerFunc<T, K> {
    (): ThirdReducerFunc<T, K>;
    (input: T[]): K;
  }
  
  interface SecondReducerFunc<T, K> {
    (): SecondReducerFunc<T, K>;
    (initialValue: K): ThirdReducerFunc<T, K>;
    (initialValue: K, input: T[]): K;
  }
  
  interface ReduceFunc {
    (): ReduceFunc;
    <T, K>(reducer: (acc: K, val: T) => K): SecondReducerFunc<T, K>;
    <T, K>(reducer: (acc: K, val: T) => K, initialValue: K): ThirdReducerFunc<
      T,
      K
    >;
    <T, K>(reducer: (acc: K, val: T) => K, initialValue: K, input: T[]): K;
  }
  
  interface MinPropFunc<K extends string> {
    (): MinPropFunc<K>;
    <T extends { [key in K]: T[K] }>(obj: T): T[K];
  }
  
  interface PropFunc {
    (): PropFunc;
    <K extends string>(propName: K): MinPropFunc<K>;
    <T, K extends keyof T>(propName: K, obj: T): T[K];
  }
  
  interface MinArithmetic {
    (): MinArithmetic;
    (b: number): number;
  }
  
  interface Arithmetic {
    (): Arithmetic;
    (a: number): MinArithmetic;
    (a: number, b: number): number;
  }
  
  export let map = function <T, K>(mapper: (arg: T) => K, input: T[]) {
    if (arguments.length === 0) {
      return map;
    }
    if (arguments.length === 1) {
      return function subFunction(subInput: T[]) {
        if (arguments.length === 0) {
          return subFunction;
        }
        return subInput.map(mapper);
      };
    }
    return input.map(mapper);
  } as MapFunc;
  
  export let filter = function <T>(filterer: (arg: T) => T[], input: T[]) {
    if (arguments.length === 0) {
      return filter;
    }
    if (arguments.length === 1) {
      return function subFunction(subInput: T[]) {
        if (arguments.length === 0) {
          return subFunction;
        }
        return subInput.filter(filterer);
      };
    }
    return input.filter(filterer);
  } as FilterFunc;
  
  export let reduce = function <T, K>(
    reducer: (acc: K, val: T) => K,
    initialValue: K,
    input: T[]
  ) {
    if (arguments.length === 0) {
      return reduce;
    }
    if (arguments.length === 1) {
      return function subFunction(subInitialValue: K, subInput: T[]) {
        if (arguments.length === 0) {
          return subFunction;
        }
        if (arguments.length === 1) {
          return function subSubFunction(subSubInput: T[]) {
            if (arguments.length === 0) {
              return subSubFunction;
            }
            return subSubInput.reduce(reducer, subInitialValue);
          };
        }
        return subInput.reduce(reducer, subInitialValue);
      };
    }
    if (arguments.length === 2) {
      return function subFunction(subInput: T[]) {
        if (arguments.length === 0) {
          return subFunction;
        }
        return subInput.reduce(reducer, initialValue);
      };
    }
    return input.reduce(reducer, initialValue);
  } as ReduceFunc;
  
  export let add = function (a: number, b: number) {
    if (arguments.length === 0) {
      return add;
    }
    if (arguments.length === 1) {
      return function subFunction(subB: number) {
        if (arguments.length === 0) {
          return subFunction;
        }
        return a + subB;
      };
    }
    return a + b;
  } as Arithmetic;
  
  export let subtract = function (a: number, b: number) {
    if (arguments.length === 0) {
      return subtract;
    }
    if (arguments.length === 1) {
      return function subFunction(subB: number) {
        if (arguments.length === 0) {
          return subFunction;
        }
        return a - subB;
      };
    }
    return a - b;
  } as Arithmetic;
  
  export let prop = function <T extends Object, U extends keyof T>(
    obj: T,
    propName: U
  ) {
    if (arguments.length === 0) {
      return prop;
    }
    if (arguments.length === 1) {
      return function subFunction(subPropName: U) {
        if (arguments.length === 0) {
          return subFunction;
        }
        return obj[subPropName];
      };
    }
    return obj[propName];
  } as PropFunc;
  
  type F<A extends unknown[], R> = (...args: A) => R;
  type TR<I, O> = (arg: I) => O;
  
  interface PipeFunc {
    (): PipeFunc;
    <A1 extends unknown[], R1>(f: F<A1, R1>): (...args: A1) => R1;
    <A1 extends unknown[], R1, R2>(f: F<A1, R1>, tr1: TR<R1, R2>): (
      ...args: A1
    ) => R2;
    <A1 extends unknown[], R1, R2, R3>(
      f: F<A1, R1>,
      tr1: TR<R1, R2>,
      tr2: TR<R2, R3>
    ): (...args: A1) => R3;
    <A1 extends unknown[], R1, R2, R3, R4>(
      f: F<A1, R1>,
      tr1: TR<R1, R2>,
      tr2: TR<R2, R3>,
      tr3: TR<R3, R4>
    ): (...args: A1) => R4;
    <A1 extends unknown[], R1, R2, R3, R4, R5>(
      f: F<A1, R1>,
      tr1: TR<R1, R2>,
      tr2: TR<R2, R3>,
      tr3: TR<R3, R4>,
      tr4: TR<R4, R5>
    ): (...args: A1) => R5;
  }
  
  export let pipe: PipeFunc = function (...functions: Function[]) {
    if (arguments.length === 0) {
      return pipe;
    }
    return function subFunction() {
      let nextArguments = Array.from(arguments);
      let result;
      for (const func of functions) {
        result = func(...nextArguments);
        nextArguments = [result];
      }
      return result;
    };
  };
  