import db from '../index.js'

function upsert(data) {
  return db.plan.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  })
}

function find(data){
  return db.plan.findUnique({
    where: data,
  })
}

export default {
    upsert,
    find
}
