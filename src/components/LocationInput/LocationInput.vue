<template>
  <div>
    <v-autocomplete
      v-model="currentLocation"
      :items="itemsToShow"
      item-text="name"
      item-value="name"
      label="Город"
      clearable
      style="width: 100%"
      @input="onInputLocation"
      @update:modelValue="onChangeLocation"
    ></v-autocomplete>
  </div>
</template>

<script>
import * as api from '../../api'

export default {
  data () {
    return {
      currentLocation: '',
      location: {},
      suggestions: []
    }
  },
  methods: {
    onSelect () {
      console.log('111')
    },
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
          return { name: data[0].local_names.ru || data[0].name, lat: data[0].lat, lon: data[0].lon }
        }
      })
      this.currentLocation = this.location.name
    },
    async onChangeLocation (locationName) {
      if (locationName) {
        const location = await api.location.getLocationByName(locationName).then(({ data }) => {
          if (data && data[0]) {
            return { name: data[0].local_names.ru || data[0].name, lat: data[0].lat, lon: data[0].lon }
          }
        })
        if (location) this.location = location
      }
    },
    async onInputLocation (event) {
      const query = event.target.value
      await api.search.searchByLocationName(query).then((res) => {
        try {
          const response = JSON.parse(res)
          if (response.suggestions.length > 0) {
            this.suggestions = response.suggestions.map((item) => item.data.city)
          }
        } catch (e) {
          console.log(e)
        }
      })
    }
  },
  computed: {
    itemsToShow () {
      return this.suggestions.length > 0 ? this.suggestions : (this.location ? [this.location.name] : [])
    }
  },
  created () {
    this.getPosition()
  },
  watch: {
    location: {
      handler (value) {
        this.$emit('change:location', value)
      },
      deep: true
    }
  }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
