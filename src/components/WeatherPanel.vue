<template v-if='weather'>
  <div class='weather-panel'>
    <img
    :src='iconURL'
    >
    <div class='temp'>
      {{temp + '°F'}}
    </div>
    <div>
      <div class='wind'>
        {{speed}} mph winds
      </div>
      <div class='description'>
        {{description}}
      </div>
    </div>
    <div :class=warningClass>
      {{warningText}}
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import getWeather from '../lib/getWeather';
  import Units from '../lib/Units';
  import safeToBike from '../lib/safeToBike';

  export default {
    name: 'WeatherPanel',
    props: {
      // 
    },
    data () {
      return {
        iconURL: '',
        temp: 0,
        speed: 0,
        threatLevel: 0,
        warningClass: '',
        warningText: '',
        weather: undefined,
        description: ''
      }
    },
    methods: {
      setupWeather: function (data) {
        this.iconURL = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        this.temp = Units.getTempInF(data.main.temp).toFixed(1);
        this.speed = Units.getSpeedInMPH(data.wind.speed).toFixed(1);
        this.threatLevel = safeToBike(data);
        this.weather = data;
        this.description = this.weather.weather[0].description;
        this.setWarning();
      },
      setWarning: function () {
        if (this.threatLevel === 3) {
          this.warningClass = 'warning-red';
          this.warningText = 'Do not go out there';
        }
        else if (this.threatLevel === 2) {
          this.warningClass = 'warning-yellow';
          this.warningText = 'Dress appropriately';
        }
        else if (this.threatLevel === 1) {
          this.warningClass = 'warning-green';
          this.warningText = 'Good to go!';
        }
        else {
          this.warningClass = 'warning-blue';
          this.warningText = 'Whoops! Something went wrong!';
          console.log(this.threatLevel);
        }
        return;
      }
    },
    mounted: function() {
      var self = this;
      getWeather().then(function (val) {
        self.setupWeather(val);
      });
    }
  };

</script>