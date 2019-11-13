require('dotenv').config()

import bcrypt from 'bcrypt'
import array from 'locutus/php/array'
import jwt from 'jsonwebtoken'

const db = require('../config/database'),
      models = ['events', 'users', 'products'],
      rounds = 12


const respond = (response, error, result, http_code) => {
    if (error) {
        response.status(400).json({ error })
    } else {
        response.status(http_code).json(result)
    }
}

export const callback = (query, request, response, http_code = 200) => {
    if (models.includes(request.params.table)) {
        db.query(query, function (error, result) {
            respond(response, error, result, http_code)
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
        request_body.user_id = request.decoded.id
    } else {
        request_body.updated_at = current_datetime
    }

    if (request.params.table === 'users' && request_body.password !== undefined) {
        request_body.password = bcrypt.hashSync(request_body.password, rounds)
    }

    return request_body
}

export const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (token === undefined) {
        return res.status(400).json({
            status: 'error',
            messge: 'No token was provided'
        })
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
    }

    if (token) {
        jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}
