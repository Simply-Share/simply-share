import db from '../index.js'

function find(data){
  return db.userPlan.findUnique({
    where: data,
  })
}

function create(data){
  return db.userPlan.create({
    data
  })
}

export default {
    find,
    create
}