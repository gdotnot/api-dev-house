import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
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
        this.server.use(cors())

        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, "..", "uploads"))
        )

        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server
