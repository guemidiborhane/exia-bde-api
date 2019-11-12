import {index, show, store, update, destroy} from './controller'

export const routes = (app) => {
    app.get('/:table', index)
    app.get('/:table/:id', show)
    app.post('/:table', store)
    app.put('/:table/:id', update)
    app.delete('/:table/:id', destroy)
}
