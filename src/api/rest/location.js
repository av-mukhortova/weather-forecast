import { makeRequest } from '../requests'

export const getLocation = ({ latitude, longitude }) => {
  console.log(latitude, longitude)
  return makeRequest({
    url: `/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1`
  })
}
