<template>
  <div id="app">
    <MapComponent msg="This is City Hall"/>
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
    }
  }
}
</script>

