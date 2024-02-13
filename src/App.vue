<template>
  <div>
    <location-input @change:location="onLocationChange($event)" />
    <template v-if="locationFetched">
      <current-weather :location="location" />
      <daily-forecast :location="location" />
    </template>
  </div>
</template>

<script>
import { LocationInput } from './components/LocationInput'
import { CurrentWeather } from './components/CurrentWeather'
import { DailyForecast } from './components/DailyForecast'

export default {
  name: 'App',
  data () {
    return {
      location: {},
      locationFetched: false
    }
  },
  methods: {
    onLocationChange (location) {
      this.location = location
      this.locationFetched = true
    }
  },
  components: {
    LocationInput,
    CurrentWeather,
    DailyForecast
  }
}
</script>

<style src="./global.scss" lang="scss"/>
