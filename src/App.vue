<template>
  <div id='app'>
    <DataPanel v-on:addressSubmit='updateAddress' v-on:updateNumberOfStations='updateNumberOfStations' :mapsLoaded='mapsIsLoaded'/>
    <MapComponent msg='This is City Hall' :given-address='center' :num-stations='numberOfStations' v-on:mapsLoaded='mapsLoaded'/>
  </div>
</template>

<script>
import Vue from 'vue';
import MapComponent from './components/MapComponent.vue';
import DataPanel from './components/DataPanel.vue';


export default {
  name: 'app',
  components: {
    MapComponent,
    DataPanel,
  },
  data () {
    return {
      center: {
        lat: 39.9524,
        latitude: 39.9524,
        lng: -75.1636,
        longitude: -75.1636
      },
      numberOfStations: 3,
      mapsIsLoaded: false
    }
  },
  methods: {
    mapsLoaded: function () {
      this.mapsIsLoaded = true;
    },
    updateAddress: function (address) {
      this.center = address;
    },
    updateNumberOfStations: function (num) {
      this.numberOfStations = num;
    }
  }
}
</script>

