const moment = require('moment');

function buildFilter(fieldObject) {

  return Object.entries(fieldObject)
    .map(([ key, value ]) => {

      if (Date.parse(value)) {
        return {
          [key]: {
            $gte: moment(value).startOf('day'),
            $lte: moment(value).endOf('day')
          }
        }
      }

      if (typeof value == 'string') { 
        return { [key]: new RegExp(value) }
      } 
    })
    .filter(field => field);
}

module.exports = {
  buildFilter
}