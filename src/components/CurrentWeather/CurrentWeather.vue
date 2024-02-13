<template>
  <div>
    <div>{{cityName}}, {{dateTime}}</div>
    <div>{{description}}</div>
    <img :src="iconUrl" :alt="description">
    {{currentWeather.main ? Math.round(currentWeather.main.temp) + ' °C' : ''}}
    {{ currentWeather.main ? 'Ощущается как: ' + Math.round(currentWeather.main.feels_like) + ' °C' : '' }}
    {{ currentWeather.wind ? 'Ветер: ' + Math.round(currentWeather.wind.speed) + ' м/с' : '' }}
  </div>
</template>

<script>
import * as api from '../../api'
import { MONTHS, ICONS_URL } from '../../constants'

export default {
  props: {
    location: { type: Object, required: true }
  },
  data () {
    return {
      currentWeather: {}
    }
  },
  computed: {
    cityName () {
      return this.location.name
    },
    dateTime () {
      const date = new Date()
      return `${date.getDate()} ${MONTHS[date.getMonth()]}`
    },
    description () {
      const desc = this.currentWeather.weather && this.currentWeather.weather[0] ? this.currentWeather.weather[0].description : ''
      return desc ? desc[0].toUpperCase() + desc.slice(1) : ''
    },
    iconUrl () {
      const icon = this.currentWeather.weather && this.currentWeather.weather[0] ? this.currentWeather.weather[0].icon : ''
      return `${ICONS_URL}${icon}@2x.png`
    }
  },
  methods: {
    async getCurrentWeather () {
      this.currentWeather = await api.weather.getCurrentWeather(this.location).then(({ data }) => {
        return data
      })
    }
  },
  created () {
    this.getCurrentWeather()
  },
  watch: {
    location: {
      handler () {
        this.getCurrentWeather()
      },
      deep: true
    }
  }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
