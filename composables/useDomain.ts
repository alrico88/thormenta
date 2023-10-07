export function useDomain<T>(
  array: MaybeRefOrGetter<T[]>,
  accessor: (d: T) => number,
): ComputedRef<{ min: number; max: number }> {
  return useArrayReduce(
    array,
    (acc, item) => {
      const val = accessor(item);

      if (val < acc.min) {
        acc.min = val;
      }

      if (val > acc.max) {
        acc.max = val;
      }

      return acc;
    },
    {
      min: Infinity,
      max: -Infinity,
    },
  );
}
