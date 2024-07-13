import db from '../index.js'

function create(data) {
  return db.user.create({
    data,
  })
}

function update(filter, data, otherArgs = {}) {
  return db.user.update({
    where: { id, ...filter },
    data,
    ...otherArgs,
  })
}

function findByEmail(email) {
  return db.user.findUnique({
    where: { email },
    include: {
      plan: true,
    }
  })
}

export default {
  create,
  update,
  findByEmail,
}
