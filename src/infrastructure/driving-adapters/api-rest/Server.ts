import express from 'express'
import * as http from 'http'
import morgan from 'morgan'

import routes from './routes'

export class Server {
  private readonly _port: string
  private readonly _app: express.Express
  private _httpServer?: http.Server

  constructor (port: string) {
    this._port = port
    this._app = express()
    this._app.use(express.json())
    this._app.use(morgan('short'))
    this._app.use(express.urlencoded({ extended: false }))
    this._app.use(routes)
  }

  async listen (): Promise<void> {
    return await new Promise(resolve => {
      this._httpServer = this._app.listen(this._port, () => {
        console.log('Server running on port ' + this._port)
        console.log('Press CTRL-C to stop')
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close(error => {
          if (error != null) {
            return reject(error)
          }
          return resolve()
        })
      }
      return resolve()
    })
  }
}
