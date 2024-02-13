import { makeRequest } from '../requests'

export const getCurrentWeather = ({ lat, lon }) => {
  return makeRequest({
    url: `/data/2.5/weather?lat=${lat}&lon=${lon}`
  })
}

export const getDailyForecast = ({ lat, lon }) => {
  return makeRequest({
    url: `data/2.5/forecast?lat=${lat}&lon=${lon}`
  })
}
