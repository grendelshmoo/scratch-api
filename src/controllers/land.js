const model = require('../models/land')

function getAll(req, res, next) {
  const data = model.getAll()
  res.status(200).json({
    data
  })
}

function getOne(req, res, next) {
  const id = req.params.id
  const data = model.getOne(id)
  res.status(201).json({
    data
  })

}

function createRecord(req, res, next) {
  const result = model.createRecord(req.body)

  if (result.errors) {
    return next({
      status: 400,
      message: `Could not create new record`,
      errors: result.errors
    })
  }
  res.status(201).json({
    data: result
  })
}

function changeRecord(req, res, next) {
  const id = req.params.id
  const body = req.body
  const data = model.changeRecord(id, body)
  console.log(data.status)
  if (data.status) {
    next({
      error: data
    })
  }
  res.status(200).json({
    data
  })
}

function deleteRecord(req, res, next) {
  const id = req.params.id
  const data = model.deleteRecord(id)
  if (data.status) {
    next({
      error: data
    })
  }
  res.status(200).json({
    data
  })
}


module.exports = {
  getAll,
  getOne,
  createRecord,
  changeRecord,
  deleteRecord
}
