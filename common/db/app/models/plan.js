import db from '../index.js'

function upsert(data) {
  return db.plan.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  })
}

export default {
    upsert,
}
