import {callback, sqlParametrize, prepareBody} from './helpers'

const db = require('../config/database')

export const index = (req, res) => {
    let columns = req.query.columns || '*'
    callback(`SELECT ${columns} from ${req.params.table}`, req, res)
}

export const show = (req, res) => {
    let params = req.params
    let columns = req.query.columns || '*'
    callback(`SELECT ${columns} from ${params.table} WHERE id=${params.id}`, req, res)
}

export const store = (req, res) => {
    let request_body = prepareBody(req),
        [columns, values] = sqlParametrize(request_body)

    callback(`INSERT INTO ${req.params.table} (${columns}) VALUES (${values})`, req, res)
}

export const update = (req, res) => {
    let request_body = prepareBody(req),
        sets = []
    Object.keys(request_body).forEach(item => {
        sets.push(`${item}=${db.escape(request_body[item])}`)
    })

    callback(`UPDATE ${req.params.table} SET ${sets.join(', ')} WHERE id=${req.params.id}`, req, res)
}

export const destroy = (req, res) => {
    callback(`DELETE FROM ${req.params.table} WHERE id=${req.params.id}`, req ,res)
}
