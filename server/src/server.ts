import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express()

// cors -> controle de segurança
app.use(cors())
// Verificar se tem algo na requisição em formato JSON
app.use(express.json());
app.use(routes);

// GET -> Buscar informações
// POST -> Cadastrar informações
// PUT -> Atualizar informações
// PATCH -> Atualizar uma informação única de uma entidade 
// DELETE -> Deletar uma informação

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!')
})