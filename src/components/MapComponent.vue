<template>
    <gmap-map
    :center="center"
    :zoom="15"
    style="width: 100%; height: 100%"
    v-if="stations.length > 0"
  >
    <gmap-info-window
    v-for="(s, index) in stations"
    :position="s.geometry.position"
    :opened="true"
    >
    <div class="infowindow">
      <div>
        <div class="bikesAvailable">
          {{s.properties.bikesAvailable}}
        </div>
      bikes
      </div>
      <div>
        <div class="docksAvailable">
        {{s.properties.docksAvailable}}
        </div>
        docks
      </div>
    </div>
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
      center: {lat: 39.9524, lng: -75.1636}
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