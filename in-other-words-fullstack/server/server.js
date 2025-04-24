import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import quoteRoutes from './routes/quoteRoutes.js'
import { sequelize } from './models/index.js' 

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/quotes', quoteRoutes)

app.get('/', (req, res) => {
  res.send('In Other Words API running')
})

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
