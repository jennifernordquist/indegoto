export default {
  temps: { //deg f
    yellow: {
      low: 49,
      high: 86
    },
    red: {
      low: 20,
      high: 98
    }
  },
  wind: { //mph
    yellow: 20,
    red: 30
  },
  codes: {
      yellow: [
      200, // thunderstorm with light rain   
      201, // thunderstorm with rain    
      210, // light thunderstorm   
      221, // ragged thunderstorm  
      230, // thunderstorm with light drizzle  
      231, // thunderstorm with drizzle  
      232, // thunderstorm with heavy drizzle
      520, // light intensity shower rain  
      521, // shower rain  
      531, // ragged shower rain
      602, // heavy snow 
      616, // rain and snow
      621, // shower snow   
      ], 
      red: [
      202, // thunderstorm with heavy rain  
      211, // thunderstorm   
      212, // heavy thunderstorm   
      503, // very heavy rain  
      504, // extreme rain   
      511, // freezing rain  
      522, // heavy intensity shower rain  
      611, // sleet  
      612, // shower sleet
      622, // heavy shower snow
      762, // volcanic ash   
      771, // squalls  
      781, // tornado
      900, // tornado
      901, // tropical storm
      902, // hurricane
      903, // cold
      904, // hot
      905, // windy
      906, // hail
      957, // high wind, near gale
      958, // gale
      959, // severe gale
      960, // storm
      961, // violent storm
      962 // hurricane
   ]
 }
}