const searchUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
const searchToken = '5eb672c9372561e8fdd9eded3784d52241a6241e'

const searchOptions = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + searchToken
  }
}

export const searchByLocationName = (query) => {
  const options = {
    ...searchOptions,
    ...{
      body: JSON.stringify({
        query,
        from_bound: { value: 'city' },
        to_bound: { value: 'city' }
      })
    }
  }
  return fetch(searchUrl, options).then(response => response.text())
}
