import safeConditions from './safeConditions';
import Units from './Units';

export default function (weatherData) {
  // 0 is unchecked or error
  // 1 is green
  // 2 is yellow
  // 3 is red
  var threatLevel = 0; 

  // check temp
  if (Units.getTempInF(weatherData.main.temp_min) < safeConditions.temps.red.low ||
      Units.getTempInF(weatherData.main.temp_max) > safeConditions.temps.red.high ) {
    threatLevel = 3;
  }
  else if (weatherData.main.temp_min < safeConditions.temps.yellow.low ||
      weatherData.main.temp_max > safeConditions.temps.yellow.high ) {
    threatLevel = 2;
  }
  else {
    threatLevel= 1;
  }

  //check wind
  if (weatherData.wind.speed > safeConditions.wind.red) {
    threatLevel = 3;
  }
  else if (weatherData.wind.speed > safeConditions.wind.yellow &&
      threatLevel <= 2 ) {
    threatLevel = 2;
  }
  else {
    threatLevel= 1;
  }

  //check condition codes
  if(threatLevel < 3) {
    safeConditions.codes.red.forEach(function(code) {
      if (weatherData.weather[0].id === code) {
        threatLevel = 3;
      }
    });
  }
  else if (threatLevel < 2) {
    safeConditions.codes.yellow.forEach(function(code) {
      if (weatherData.weather[0].id === code) {
        threatLevel = 2;
      }
    });
  }
  else {
    threatLevel = 1;
  }
  
  return threatLevel;
};