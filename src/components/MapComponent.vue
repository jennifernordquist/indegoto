<template>
    <gmap-map
    :center="center"
    :zoom="15"
    style="width: 100%; height: 100%"
    v-if="stations.length > 0"
  >
  <gmap-marker
    :key="index"
    v-for="(m, index) in stations"
    :position="m.geometry.position"
    ></gmap-marker>
    <gmap-info-window
    v-for="(s, index) in stations"
    :position="s.geometry.position"
    :id="s.properties.kioskId"
    :opened="true"
    >
      {{msg}}!
    </gmap-info-window>
  </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAlfIPueH1ILDGeT2z_neVtoDe6NW4_g2I'
      // libraries: 'places', //// If you need to use place input
    }
  });



export default {
  name: 'MapComponent',
  props: {
    msg: String,
    bikeData: Object
  },
  data () {
    return {
      center: {lat: 39.9524, lng: -75.1636},
      markers: [{
        position: {lat: 39.9524, lng: -75.1636}
      }, {
        position: {lat: 39.9343, lng: -75.1583}
      }]
    }
  },
  asyncComputed: {
    stations: {
      get () {
          return fetch("https://www.rideindego.com/stations/json/").then(function(response) { 
          return response.json()}).then(function(data) {
            return data.features
          }).then(function(data) {
            data.forEach(function(station) {
              station.geometry.position = {
                lng: station.geometry.coordinates[0],
                lat: station.geometry.coordinates[1]
              }
            })
            console.log(data);
            return data;
          })
        },
        default: []
      }
  }
}
</script>