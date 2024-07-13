import db from '../index.js'

function create(data){
    return db.shareable.create({
        data
    })
}

export default {
    create
}