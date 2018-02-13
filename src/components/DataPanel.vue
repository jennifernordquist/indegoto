<template>
  <div class="data-panel">
    <input
    type="text"
    id="address-bar"
    ref="address-bar"
    placeholder="Enter an address"
    v-on:change="getAddressData"
    />
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as VueGoogleMaps from 'vue2-google-maps';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAlfIPueH1ILDGeT2z_neVtoDe6NW4_g2I',
      libraries: 'places' //// If you need to use place input
      }
    });

  export default {
    name: 'DataPanel',
    props: {
      // 
    },
    data () {
      return {
        address: ''
      }
    },

    mounted () {
      this.$refs['address-bar'].focus();
    },

    methods: {
        /**
        * When the location found
        * @param {Object} addressData Data of the found location
        * @param {Object} placeResultData PlaceResult object
        * @param {String} id Input container ID
        */
        getAddressData: function (addressData, placeResultData, id) {
          this.address = addressData.srcElement.value;
          this.$emit("addressSubmit", this.address);
        }
    }
  }
</script>