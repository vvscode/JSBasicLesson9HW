export async function getLocation() {
  const response = await fetch('https://ipinfo.io/json?token=7ce0407bb7be70');
  const jsonResponse = await response.json();
  let city;
  let coordinates;
  if (jsonResponse) {
    city = jsonResponse.city;
    const splittedCoord = jsonResponse.loc.split(',');
    coordinates = [splittedCoord[0], splittedCoord[1]];
  } else {
    return null;
  }
  return { city, coordinates };
}
