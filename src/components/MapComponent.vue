<template>
  <gmap-map
  :center="center"
  :zoom="17"
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
  v-for="(s, index) in shownStations"
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
    givenAddress: Object,
    numStations: Number
  },
  data () {
    return {
      center: this.givenAddress,
      shownStations: []
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
            data.sort(function(a, b) {
              if(a.geometry.distance < b.geometry.distance) {
                return -1;
              }
              else if(a.geometry.distance === b.geometry.distance) {
                return 0;
              }
              else {
                return 1;
              }
            });
            self.shownStations = data.slice(0, self.numStations);
            console.log(data);
            return data;
          })
      },
      default: []
    }
  },
  methods: {
    getBounds: function () {
      var bounds = {
        north: 40,
        east: -75,
        south: 39,
        west: -76
      }
      return new window.google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
    }
  },
  updated () {
    console.log(this.$children[0]);
    var self = this;
    this.$children[0].$mapCreated.then(function (){
      self.$children[0].fitBounds(self.getBounds()) 
    });
  }
}
</script>