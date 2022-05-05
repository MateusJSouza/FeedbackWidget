import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6db0fbe4d8b552",
    pass: "4f5332cce62012"
  }
});

// GET -> Buscar informações
// POST -> Cadastrar informações
// PUT -> Atualizar informações
// PATCH -> Atualizar uma informação única de uma entidade 
// DELETE -> Deletar uma informação

// Verificar se tem algo na requisição em formato JSON
app.use(express.json());

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

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Mateus Jesus <batata@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type} </p>`,
      `<p>Comentário: ${comment} </p>`,
      `</div>`
    ].join('\n'),
  })
  
  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('HTTP server running!')
})