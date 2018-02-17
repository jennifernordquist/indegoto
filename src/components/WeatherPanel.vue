<template>
  <div
  class="weather-panel"
  v-if="weather.weather"
  >
  <img
  :src='iconURL'
  >
  {{weather.weather[0].description}}
</div>
</template>

<script>
  import Vue from 'vue';
  import AsyncComputed from 'vue-async-computed';
  import getWeather from '../lib/getWeather';

  export default {
    name: 'WeatherPanel',
    props: {
      // 
    },
    data () {
      return {
        iconURL: ""
      }
    },
    asyncComputed: {
      weather: {
        get () {
          var data = getWeather();
          this.iconURL = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
          console.log(data);
          return data;
        },
        default: {}
      }
      //
    }
  }

</script>