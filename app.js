

import express from 'express'


import globalerr from './src/midleware/globalerr.js'
import { bootStrap } from './bootstrap.js'
import { AppErr } from './src/midleware/catcherr.js'


import './database/dbconection.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads",express.static("uploads"))

const port = 3000



bootStrap(app)


app.use("*",(req,res,next)=>{
      next( new AppErr('page not found',404))
})
app.use(globalerr)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))