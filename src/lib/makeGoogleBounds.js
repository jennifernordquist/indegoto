import * as VueGoogleMaps from 'vue2-google-maps';

export default function(points) {
  const bounds = {};

  points.forEach(function(pt){
    if (bounds.north !== undefined) {
      if(pt.lat > bounds.north) {
        bounds.north = pt.lat;
      }
    }
    else {
      bounds.north = pt.lat;
    }

    if (bounds.south !== undefined) {
      if(pt.lat < bounds.south) {
        bounds.south = pt.lat;
      }
    }
    else {
      bounds.south = pt.lat;
    }

    if (bounds.west !== undefined) {
      if(pt.lng < bounds.west) {
        bounds.west = pt.lng;
      }
    }
    else {
      bounds.west = pt.lat;
    }

    if (bounds.east !== undefined) {
      if(pt.lng > bounds.east) {
        bounds.east = pt.lng;
      }
    }
    else {
      bounds.east = pt.lng;
    }

  })

  return new window.google.maps.LatLngBounds(
    new google.maps.LatLng(bounds.south, bounds.west),
    new google.maps.LatLng(bounds.north, bounds.east)
  );
};
