import circle from "@turf/circle";

export function createCircleFromCoords(
  point: [number, number],
  distanceInMeters: number,
): never {
  return circle(point, distanceInMeters, {
    units: "meters",
  }) as never;
}
