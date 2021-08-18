const fs = require('fs-extra')
const Excel = require('exceljs')
const path = require('path')
const pushOrCreate = require('./lib/pushOrCreate')

async function getPanelCuttings() {

  async function getFileData(fileName) {
    const fileLocation = path.join(__dirname, './input', fileName)
    const workbook = new Excel.Workbook()
    return workbook.xlsx.readFile(fileLocation)
      .then(({ worksheets }) => {
        const worksheet = worksheets[0]
        const data = {}

        worksheet.eachRow({ includeEmpty: false }, function(row) {
          const [height, length] = row.values.filter(val => val)
          pushOrCreate(data, height, length)
        })
        return { data, fileName }
      }).catch(e => {
        console.error(`Could not read ${file}`)
        throw e
      })
  }


  function handleDataSet({ data, fileName }) {
    console.log(arguments)
    let resultDoc = 'height;leftover;parts;noParts'

    const c = 0.01
    const targetSum = 2400

    function getGroupsForHeight(height, lengths) {
      function getGroup(lengths) {

        const listOfSums = lengths.reduce((acc, val) => {

          const accWithCurrentNumber = acc.map(accVal => ({
            sum: accVal.sum + val,
            lengths: (() => {
              const lengthsArray = accVal.lengths.slice()
              lengthsArray.push(val)
              return lengthsArray
            })()
          }))

          const union = [...accWithCurrentNumber, ...acc].sort((a, b) => a.sum - b.sum)
          let y = union[0]
          const S = []
          S.push(y)
          union.forEach(unionItem => {
            if (y.sum + c * targetSum / lengths.length < unionItem.sum && unionItem.sum <= targetSum) {
              y = unionItem
              S.push(unionItem)
            }
          })
          return S
        }, [{ sum: 0, lengths: [] }])

        return listOfSums[listOfSums.length - 1]
      }

      while (lengths.length) {
        let result = getGroup(lengths)
        result.lengths.forEach(length => {
          lengths.splice(lengths.indexOf(length), 1)
        })
        resultDoc += `\n${height};${targetSum - result.sum};${result.lengths};${result.lengths.length}`
      }
    }

    Object.entries(data).forEach(([height, lengths]) => getGroupsForHeight(height, lengths))

    return fs.writeFile(path.join(__dirname, './output', fileName.replace('.xlsx', '.csv')), resultDoc)
  }






  return fs.readdir(path.join(__dirname, './input'))
    .then(fileNames => Promise.all(fileNames.map(getFileData)))
    .then(dataSets => Promise.all(dataSets.map(handleDataSet)))
    .catch(e => { throw e })


}

getPanelCuttings()
