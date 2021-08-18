module.exports = function pushOrCreate(object, key, value) {
  if (Array.isArray(object[key])) return object[key].push(value)
  if (!object[key]) return object[key] = [value]
  throw `${object[key]} exists but is not an array, can't push into it!`
}
