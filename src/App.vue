<template>
  <div id="app">
    <MapComponent msg="This is City Hall" :given-address='center' :num-stations='numberOfStations'/>
  </div>
</template>

<script>
import MapComponent from './components/MapComponent.vue';

export default {
  name: 'app',
  components: {
    MapComponent
  },
  data () {
    return {
      center: {
        lat: 39.9524,
        latitude: 39.9524,
        lng: -75.1636,
        longitude: -75.1636
      },
      numberOfStations: 3
    }
  }
}
</script>

