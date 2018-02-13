<template>
  <div class='data-panel'>

    <vue-google-autocomplete
    v-if='mapsLoaded'
    id='address-bar'
    ref='address-bar'
    classname='form-control'
    placeholder='Enter an address'
    v-on:placechanged='getAddressData'
    >
    </vue-google-autocomplete>
    <br/>
    <label
    for='number-of-stations'
    >
      Number of Stations Shown:
    </label>
    <input
      id='number-of-stations'
      ref='number-of-stations'
      type='number'
      value=3
      v-on:change='updateNumberOfStations'
      >
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as VueGoogleMaps from 'vue2-google-maps';
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAlfIPueH1ILDGeT2z_neVtoDe6NW4_g2I',
      libraries: 'places' //// If you need to use place input
      }
    });

  export default {
    name: 'DataPanel',
    props: {
        mapsLoaded: Boolean
      // 
    },
    data () {
      return {
        address: {},
      }
    },
    components: { VueGoogleAutocomplete },

    updated () {
      if(this.mapsLoaded) {
        this.$refs['address-bar'].focus();
      }
    },

    methods: {
        /**
        * When the location found
        * @param {Object} addressData Data of the found location
        * @param {Object} placeResultData PlaceResult object
        * @param {String} id Input container ID
        */
        getAddressData: function (addressData, placeResultData, id) {
          this.address = {
            lat: addressData.latitude,
            latitude: addressData.latitude,
            lng: addressData.longitude,
            longitude: addressData.longitude
          }
          this.$emit('addressSubmit', this.address);
        },
        updateNumberOfStations: function (input) {
          this.$emit('updateNumberOfStations', parseInt(input.srcElement.value));
        }
    }
  }
</script>