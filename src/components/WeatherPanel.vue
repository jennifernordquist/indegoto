<template>
  <div
  class='weather-panel'
  v-if='weather.weather'
  >
  <img
  :src='iconURL'
  >
  <div>
    <span class='temp'>
      {{temp + '°'}}
    </span>

    {{weather.weather[0].description}}
  </div>
</div>
</template>

<script>
  import Vue from 'vue';
  import AsyncComputed from 'vue-async-computed';
  import getWeather from '../lib/getWeather';
  import getTempInF from '../lib/getTempInF';

  export default {
    name: 'WeatherPanel',
    props: {
      // 
    },
    data () {
      return {
        iconURL: "",
        temp: 0
      }
    },
    asyncComputed: {
      weather: {
        get () {
          var data = getWeather();
          this.iconURL = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
          this.temp = getTempInF(data.main.temp).toFixed(1);
          console.log(data);
          return data;
        },
        default: {}
      }
      //
    }
  }

</script>