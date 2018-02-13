<template>
  <div id="app">
    <DataPanel v-on:addressSubmit="updateAddress" />
    <MapComponent msg="This is City Hall" :given-address='center' :num-stations='numberOfStations'/>
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
    DataPanel
  },
  data () {
    return {
      center: {
        lat: 39.9524,
        latitude: 39.9524,
        lng: -75.1636,
        longitude: -75.1636
      },
      numberOfStations: 6
    }
  },
  // watch: {
  //   center: {
  //     handler: function(newVal, oldVal) {},
  //     deep: true
  //   }
  // },
  methods: {
    updateAddress: function (address) {
      var self = this;

      
      if (typeof(geocoder) == 'undefined') {
       var geocoder = new google.maps.Geocoder();
      }
      console.log(address);
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var loc = results[0].geometry.location;
          const center = {
            lat: loc.lat(),
            latitude: loc.lat(),
            lng: loc.lng(),
            longitude: loc.lng()
          };
          self.center = center;
          // self.center = 
          // Vue.set(this, 'center', center);
        } else {
          console.log("Geocoder status: " + status);
        }
      });
    }
  }
}
</script>

