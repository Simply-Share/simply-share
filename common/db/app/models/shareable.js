import db from '../index.js'

function create(data){
    return db.shareable.create({
        data
    })
}

function count(filter){
    return db.shareable.count({
        where: filter
    })
}

function list(filter,args={}){
    return db.shareable.findMany({
        where: filter,
        ...args
    })
}

export default {
    create,
    count,
    list
}