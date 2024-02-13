import { makeRequest } from '../requests'

export const getLocation = ({ latitude, longitude }) => {
  return makeRequest({
    url: `/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1`
  })
}

export const getLocationByName = (query) => {
  return makeRequest({
    url: `/geo/1.0/direct?q=${query}&limit=1`
  })
}
