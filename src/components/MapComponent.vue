<template>
  <gmap-map
  :center='givenAddress'
  :zoom='17'
  style='width: 100%; height: 100%'
  v-if='stations.length > 0'
  > 
  <gmap-marker 
  :position.sync='givenAddress'
  :clickable='true'
  :draggable='false'
  @g-click='center=givenAddress'
  ></gmap-marker>
  <gmap-info-window
  v-for='(s, index) in shownStations'
  :position='s.geometry.position'
  :opened='true'
  >
  <div class='infowindow'>
    <div :class='s.classes.bikes'>
      <div>
        {{s.properties.bikesAvailable}}
      </div>
      bikes
    </div>
    <div :class='s.classes.docks'>
      <div>
        {{s.properties.docksAvailable}}
      </div>
      docks
    </div>
    <div class='iw-distance'>
      {{s.geometry.distance.toFixed(3)}} miles away
    </div>
    <div class='iw-address'>
      {{s.properties.addressStreet}}
    </div>
  </div>
</gmap-info-window>
</gmap-map>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import AsyncComputed from 'vue-async-computed'
import Haversine from 'haversine'
import makeGoogleBounds from '../lib/makeGoogleBounds'

Vue.use(AsyncComputed);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAlfIPueH1ILDGeT2z_neVtoDe6NW4_g2I',
    libraries: 'places' //// If you need to use place input
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
      shownStations: [],
      recentOrigin: this.givenAddress
    }
  },
  asyncComputed: {
    stations: {
      get () {
        var self = this;
        return fetch('https://www.rideindego.com/stations/json/')
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


              const levels = 13;
              const docks = station.properties.totalDocks;
              station.relativeNums = {
                bikes: (station.properties.bikesAvailable / docks * levels).toFixed(0),
                docks: (station.properties.docksAvailable / docks * levels).toFixed(0)
              };
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
            self.shownColors();
            // console.log(data);
            return data;
          })
      },
      default: []
    }
  },
  methods: {
    shownColors: function () {
      this.shownStations.forEach(function (station) {
        station.classes = {
          bikes: 'bikesAvailable level-'.concat(station.relativeNums.bikes),
          docks: 'docksAvailable level-'.concat(station.relativeNums.docks)
        };
      })
    },
    isEquivalent: function (a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    },
    getBounds: function () {
      const stationsData = [];

      this.shownStations.forEach(function (s) {
        stationsData.push(s.geometry.position);
      });
      return makeGoogleBounds(this.givenAddress, stationsData);
    },
    updateShownStations: function () {
      var address = this.givenAddress;
      if(this.recentOrigin !== this.givenAddress) {
        this.recentOrigin = this.givenAddress;
        this.stations.forEach(function(station) {
          station.geometry.distance = Haversine(address, station.geometry.position, {unit: 'mile'});
        })
        this.stations.sort(function(a, b) {
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
      }
      this.shownStations = this.stations.slice(0, this.numStations);
      this.shownColors();
    }
  },
  watch: {
    numStations: function () {
      this.updateShownStations();
    }
  },
  updated () {
    var self = this;
    var map = this.$children[0];
    map.$mapCreated.then(function (){
      self.$emit('mapsLoaded')
      if (!(self.isEquivalent(self.givenAddress, self.recentOrigin))) {
      self.updateShownStations();
    }
      map.fitBounds(self.getBounds());
    });
  }
}
</script>