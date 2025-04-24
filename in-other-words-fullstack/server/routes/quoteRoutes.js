import express from 'express'
import { getAllQuotes, createQuote } from '../controllers/quoteController.js'

const router = express.Router()

router.get('/', getAllQuotes)
router.post('/', createQuote)

export default router
