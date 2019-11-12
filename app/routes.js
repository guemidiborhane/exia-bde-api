import AppController from './Controllers/AppController'
import AuthController from './Controllers/AuthController'

import {checkToken} from './helpers'

export const routes = (app) => {
    app.post('/authenticate', AuthController.authenticate)

    app.use('/api', checkToken)
    app.get('/api/:table', AppController.index)
    app.get('/api/:table/:id', AppController.show)
    app.post('/api/:table', AppController.store)
    app.put('/api/:table/:id', AppController.update)
    app.delete('/api/:table/:id', AppController.destroy)
}
