import * as VueGoogleMaps from 'vue2-google-maps';

export default function(address, points) {
  const bounds = {
    north: address.lat,
    south: address.lat,
    west: address.lng,
    east: address.lng
  };

  points.forEach(function(pt){

  if(pt.lat > bounds.north) {
    bounds.north = pt.lat;
  }

  if(pt.lat < bounds.south) {
    bounds.south = pt.lat;
  }

  if(pt.lng < bounds.west) {
    bounds.west = pt.lng;
  }

  if(pt.lng > bounds.east) {
    bounds.east = pt.lng;
  }


  })

  return new window.google.maps.LatLngBounds(
    new google.maps.LatLng(bounds.south, bounds.west),
    new google.maps.LatLng(bounds.north, bounds.east)
  );
};
