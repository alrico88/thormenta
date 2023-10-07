import { processNumber } from "number-helper-functions";

export interface Distance {
  distanceInMeters: number;
  distance: number;
  units: "m" | "km";
}

export function useDistance(
  startDate: Ref<Date>,
  endDate: Ref<Date | undefined>,
): ComputedRef<Distance> {
  return computed(() => {
    if (!endDate.value) {
      return {
        distanceInMeters: 0,
        distance: 0,
        units: "m",
      };
    }

    const differenceInSeconds =
      (endDate.value.getTime() - startDate.value.getTime()) / 1000;

    const meters = differenceInSeconds * 340;

    if (meters > 1000) {
      return {
        distanceInMeters: meters,
        distance: processNumber(meters / 1000),
        units: "km",
      };
    } else {
      return {
        distanceInMeters: meters,
        distance: processNumber(meters),
        units: "m",
      };
    }
  });
}
