import db from '../index.js'

function create(data) {
  return db.user.create({
    data,
  })
}

function updateById(id, data, filter = {}, otherArgs = {}) {
  return db.user.update({
    where: { id, ...filter },
    data,
    ...otherArgs,
  })
}

export default {
  create,
  updateById,
}
