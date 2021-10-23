const rp = require('request-promise');

const requestOptions = {
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: '1',
    limit: '5000',
    convert: 'KES',
  },
  headers: {
    'X-CMC_PRO_API_KEY': '9a916bac-4909-492a-8eb9-395dc13d0234',
  },
  json: true,
  gzip: true,
};

rp(requestOptions)
  .then((response) => {
    console.log('API call response:', response);
  })
  .catch((err) => {
    console.log('API call error:', err.message);
  });
