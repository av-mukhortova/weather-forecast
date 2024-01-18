import axios from 'axios'

const baseURL = 'http://api.openweathermap.org'
const apiKey = 'd8a8c44c60137d38ed253b333229deff'

export const makeRequest = ({
  url, method = 'get', data = {}, headers = {}
}) => axios({
  url: `${url}&appid=${apiKey}`,
  method,
  data,
  baseURL,
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
    ...headers
  }
})
