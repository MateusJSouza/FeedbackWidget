import express from 'express';
import { prisma } from './prisma';

const app = express()

// GET -> Buscar informações
// POST -> Cadastrar informações
// PUT -> Atualizar informações
// PATCH -> Atualizar uma informação única de uma entidade 
// DELETE -> Deletar uma informação

// Verificar se tem algo na requisição em formato JSON
app.use(express.json())

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      // Short syntax
      type,
      comment,
      screenshot
    }
  })
  
  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('HTTP server running!')
})