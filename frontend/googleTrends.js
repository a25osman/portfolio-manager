const googleTrends = require('google-trends-api');

const google_api = function () {
  var d = new Date(); d.setDate(d.getDate() - 365);
  return googleTrends.interestOverTime({ keyword: 'Crypto', startTime: d, endTime: new Date() })
    .then((res) => {
      const label = []
      const popularity = []
      const info = JSON.parse(res);
      const list = info.default.timelineData
      for (let object of list) {
        label.push(object.formattedAxisTime)
        popularity.push(object.value[0])
        console.log("label: ", object.formattedAxisTime, "popularity : ", object.value[0])
      }
      return [ label , popularity ]
    })
};
google_api()
module.exports = { google_api };