import AppController from './controller'

export const routes = (app) => {
    app.get('/:table', AppController.index)
    app.get('/:table/:id', AppController.show)
    app.post('/:table', AppController.store)
    app.put('/:table/:id', AppController.update)
    app.delete('/:table/:id', AppController.destroy)
}
