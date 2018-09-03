const priceFormat = (value) => {
  if(!value || Number(value) === NaN ) return '¥ 0.00'
  return value = '¥ ' + Number(value).toFixed(2)
}
const querystring = (value) => {
  if(!value || value.length < 2) return
  var obj = {}
  value = value.replace(/^\?/,'')
  if(value.indexOf('&') === -1)
    value = [value]
  else
    value = value.split('&')
  for( var item of value){
    var attrs = item.split('=')
    obj[attrs[0]] = attrs[1]
  }
  return obj
}

module.exports = {
  priceFormat,
  querystring,
}