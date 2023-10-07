export function getUserLocation(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      },
      (err) => {
        reject(err);
      },
    );
  });
}
