<template>
  <div id="app">
    <MapComponent msg="This is City Hall" :bikeData=bikeData />
  </div>
</template>

<script>
import MapComponent from './components/MapComponent.vue';

// var fetchedBikeData = {};
// fetch("https://www.rideindego.com/stations/json/").then(function(response) {
//   return response.json();
//   }).then(function(data) {
//     fetchedBikeData = data;
//     console.log(fetchedBikeData);
//   });


export default {
  name: 'app',
  components: {
    MapComponent
  },
  data () {
    return {
      bikeData: {}
    }
  }
}
</script>

