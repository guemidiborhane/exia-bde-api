require('dotenv').config()

import app from '../config/app'
import bcrypt from 'bcrypt'
import array from 'locutus/php/array'

const db = require('../config/database'),
      models = ['events', 'users'],
      rounds = 12


const respond = function (response, error, result) {
    if (error) {
        response.status(404).json({ error })
    } else {
        response.status(200).json(result)
    }
}

export const callback = (query, request, response) => {
    if (models.includes(request.params.table)) {
        db.query(query, function (error, result) {
            respond(response, error, result)
        })
    } else {
        response.status(404).json({
            error: 'Model not found'
        })
    }
}

export const sqlParametrize = (request_body) => {
    let columns = array.array_keys(request_body).join(', '),
    values = array.array_values(request_body).map(function(value) {
        return db.escape(value)
    }).join(', ')

    return [[columns], [values]]
}

export const prepareBody = (request) => {
    let request_body = request.body,
        current_datetime = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    if (request.params.id === undefined) {
        if (request_body.created_at === undefined) {
            request_body.created_at = request_body.updated_at = current_datetime
        } else {
            request_body.updated_at = request_body.created_at
        }
    } else {
        request_body.updated_at = current_datetime
    }

    if (request.params.table === 'users' && request_body.password !== undefined) {
        request_body.password = bcrypt.hashSync(request_body.password, rounds)
    }

    return request_body
}
