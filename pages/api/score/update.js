// pages/api/update.js

import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongoose';
import Score from '@/models/Score';

// Conectar ao banco de dados
dbConnect();

// Definir o esquema do modelo
const ScoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  score: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
});

// Verificar se o modelo já está compilado
const ScoreModel = mongoose.models.Score || mongoose.model('Score', ScoreSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const { userId, score, errorCount } = req.body;

  try {
    // Verificar se o usuário já possui um documento Score
    const existingResults = await ScoreModel.findOne({ userId });

    if (existingResults) {
      // Se o documento Score já existir, atualize-o com os novos valores
      existingResults.score += score;
      existingResults.errorCount += errorCount;
      const updatedResults = await existingResults.save();
      
      res.status(200).json({ message: 'Resultados de digitação atualizados com sucesso.', results: updatedResults });
    } else {
      // Se o documento Score não existir, crie um novo documento para o usuário
      const newResults = new ScoreModel({ userId, score, errorCount });
      const savedResults = await newResults.save();
      
      res.status(200).json({ message: 'Documento Score criado com sucesso.', results: savedResults });
    }
  } catch (error) {
    console.error('Erro ao atualizar os resultados de digitação:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar os resultados de digitação.' });
  }
}
