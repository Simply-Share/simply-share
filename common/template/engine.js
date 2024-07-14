import fs from 'fs'
const templateEngine =
  (config = {}) =>
  (filePath, options, callback) => {
    const optionsCopy = { ...options }
    const excludedkeys = ['settings', '_locals', 'cache']
    excludedkeys.forEach((key) => {
      delete optionsCopy[key]
    })
    OPTION_KEYS.forEach((key) => {
      if (!optionsCopy[key]) {
        optionsCopy[key] = ''
      }
    })
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err)
      let fileData = content.toString()
      Object.entries(optionsCopy).forEach(([key, value]) => {
        fileData = fileData.replace(new RegExp(`__${key}__`, 'g'), value)
      })
      return callback(null, fileData)
    })
  }

export default templateEngine

const OPTION_KEYS = ['bucketLink', 'fileType', 'data', 'title']
