<template>
  <div>
    <input :value="location" type="search" placeholder="Enter location..."/>
  </div>
</template>

<script>
import * as api from '../../api'

export default {
  data () {
    return {
      location: ''
    }
  },
  methods: {
    getPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.getLocation(position)
        })
      }
    },
    async getLocation (position) {
      this.location = await api.location.getLocation(position.coords).then(({ data }) => {
        if (data && data[0]) {
          return data[0].name
        }
      })
    },
    getWeather () {
      console.log('getting weather forecast')
    }
  },
  created () {
    this.getPosition()
  },
  watch: {
    location () {
      this.getWeather()
    }
  }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
