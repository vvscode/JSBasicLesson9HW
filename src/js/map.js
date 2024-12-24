// import * as ymaps3 from 'ymaps3';
let Map;

export async function initMap(coordinates) {
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer } = ymaps3;
  Map = new YMap(document.querySelector('.fakePosition'), {
    location: { center: coordinates, zoom: 10 },
  });
  Map.addChild(new YMapDefaultSchemeLayer());
  return Map;
}

export async function setLocation(coordinates) {
  if (!Map) {
    Map = await initMap(coordinates);
  } else {
    Map.setLocation({ center: coordinates, zoom: 10 });
  }
}
