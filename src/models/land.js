const uuid = require('uuid/v4')
const land = require('../../data.js').landData

function getAll () {
  return land
}

function getOne (id) {
  const record = land.find(record => record.id === id)
  return record
}


function createRecord (body) {
  const errors = []
  const author = body.author
  const documentType = body.document_type
  const address = body.address

  let response
  if (!author || !documentType || !address) {
    errors.push('missing fields')
    response = { errors }
  } else {
    const record = { id: uuid(), author, documentType, address }
    land.push(record)
    response = record
  }
  return response
}

function changeRecord (id, body){
  const errors = []
  const author = body.author
  const documentType = body.document_type
  const address = body.address

  let response
  let record = land.find(record => record.id === id)

  if(!record) {
    errors.push(`ID is required`)
    response = { errors }
  } else {
    record.author = body.author
    record.document_type = body.document_type
    record.address = body.address
    response = { data: record }
  }
  return response
}

function deleteRecord(id) {
  const record = land.find(record => record.id === id)
  if (record) {
    const index = land.indexOf(record)
    response = {data: record}
    land.splice(index, 1)
  } else {
    response = {
      status: 400,
      message: "ID not found."
    }
  }
  return response
}



module.exports = {
  getAll,
  getOne,
  createRecord,
  changeRecord,
  deleteRecord
}
