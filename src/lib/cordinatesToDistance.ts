const deg2rad = (deg) => deg * (Math.PI / 180);

const getDistanceFromLatLonInKm = (point1: number[], point2: number[]) => {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  // eslint-disable-next-line max-len
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

export default getDistanceFromLatLonInKm;