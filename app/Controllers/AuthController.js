import app from '../../config/app'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const db = require('../../config/database')

export default {
    authenticate: function (request, response) {
        let email = db.escape(request.body.email)
        db.query(`SELECT * FROM users WHERE email=${email}`, function (error, result) {
            if (error) {
                response.status(404).json({
                    error
                })
            } else {
                let user = result[0]
                if (bcrypt.compareSync(request.body.password, user.password)) {
                    const token = jwt.sign({id: user.id}, process.env.APP_KEY, {expiresIn: '1h'})
                    response.status(200).json({
                        status: 'success',
                        data: {
                            user,
                            token: token
                        }
                    })
                } else {
                    response.status(401).json({
                        status: 'error',
                        message: 'Invalid email/password',
                        data: null
                    })
                }
            }
        })
    }
}
