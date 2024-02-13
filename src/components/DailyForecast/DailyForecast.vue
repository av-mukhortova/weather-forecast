<template>
  <div>
    <div v-for="day in preparedDays" :key="day.dt">
      {{day.date}}
      {{day.temp}}
      {{day.feels_like}}
      {{day.description}}
      {{day.wind}}
      <img :src="day.icon" :alt="day.description">
    </div>
  </div>
</template>

<script>
import * as api from '../../api'
import { MONTHS, ICONS_URL, WEATHER_TIME } from '../../constants'

export default {
  props: {
    location: { type: Object, required: true }
  },
  data () {
    return {
      dailyForecast: {}
    }
  },
  methods: {
    async getDailyForecast () {
      this.dailyForecast = await api.weather.getDailyForecast(this.location).then(({ data }) => {
        return data
      })
    }
  },
  computed: {
    preparedDays () {
      const days = this.dailyForecast.list && this.dailyForecast.list.length > 0 ? this.dailyForecast.list : []
      return days.filter((day) => new Date(day.dt_txt).getHours() === WEATHER_TIME).map((day) => {
        const date = new Date(day.dt_txt)
        const desc = day.weather && day.weather[0] ? day.weather[0].description : ''
        const icon = day.weather && day.weather[0] ? day.weather[0].icon : ''
        return {
          date: `${date.getDate()} ${MONTHS[date.getMonth()]}`,
          temp: Math.round(day.main.temp) + ' °C',
          feels_like: 'Ощущается как: ' + Math.round(day.main.feels_like) + ' °C',
          description: desc ? desc[0].toUpperCase() + desc.slice(1) : '',
          wind: 'Ветер: ' + Math.round(day.wind.speed) + ' м/с',
          icon: `${ICONS_URL}${icon}@2x.png`
        }
      })
    }
  },
  created () {
    this.getDailyForecast()
  },
  watch: {
    location: {
      handler () {
        this.getDailyForecast()
      },
      deep: true
    }
  }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
