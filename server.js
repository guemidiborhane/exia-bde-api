require('dotenv').config()

import app from './config/app'
import {routes} from './app/routes'

const db = require('./config/database')
routes(app)
