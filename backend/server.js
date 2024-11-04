import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js'
import ProductRoutes from './routes/product.route.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/products', ProductRoutes)

// console.log(process.env.MONGO_URL)
const port = process.env.PORT || 5100

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/frontend/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`)
  connectDB()
})
