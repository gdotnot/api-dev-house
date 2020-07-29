import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import { user, password, database } from '../mongoConnection.json'

class App {

    constructor() {
        this.server = express()

        mongoose.connect(`mongodb+srv://${user}:${password}@${database}.ltrnq.mongodb.net/${database}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server
