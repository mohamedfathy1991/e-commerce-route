

import express from 'express'


import { bootStrap } from './bootstrap.js'
import { AppErr } from './src/midleware/catcherr.js'
import globalerr from './src/midleware/globalerr.js'


import dotenv from "dotenv"
import './database/dbconection.js'
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static("uploads"))


const port = process.env.PORT|| 3000




dotenv.config()



bootStrap(app)   

app.use("*", (req, res, next) => {
      next(new AppErr('page not found', 404))
})
app.use(globalerr)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))