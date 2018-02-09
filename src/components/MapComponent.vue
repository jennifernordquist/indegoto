<template>
  <gmap-map
  :center="center"
  :zoom="16"
  style="width: 100%; height: 100%"
  v-if="stations.length > 0"
  > 
  <gmap-marker 
  :position.sync="center"
  :clickable="true"
  :draggable="false"
  @g-click="center=givenAddress"
  ></gmap-marker>
  <gmap-info-window
  v-for="(s, index) in stations"
  :position="s.geometry.position"
  :opened="true"
  >
  <div class="infowindow">
    <div class="bikesAvailable">
      <div>
        {{s.properties.bikesAvailable}}
      </div>
      bikes
    </div>
    <div class="docksAvailable">
      <div>
        {{s.properties.docksAvailable}}
      </div>
      docks
    </div>
    <div>
      {{s.geometry.distance.toFixed(3)}} miles away
    </div>
  </div>
</gmap-info-window>
</gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed'
import Haversine from 'haversine'

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
    bikeData: Object,
    givenAddress: Object
  },
  data () {
    return {
      center: this.givenAddress
    }
  },
  asyncComputed: {
    stations: {
      get () {
        var self = this;
        return fetch("https://www.rideindego.com/stations/json/")
          .then(function(response) { 
            return response.json()
          })
          .then(function(data) {
            return data.features
          })
          .then(function(data) {
            data.forEach(function(station) {
              station.geometry.position = {
                lng: station.geometry.coordinates[0],
                longitude: station.geometry.coordinates[0],
                latitude: station.geometry.coordinates[1],
                lat: station.geometry.coordinates[1]
              }
              station.geometry.distance = Haversine(self.givenAddress, station.geometry.position, {unit: 'mile'});
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