import dbConnect from '@/lib/mongoose';
import TypingResults from '@/models/TypingResults';

// Conectar ao banco de dados
dbConnect();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const { email } = req.body;

  try {
    // Buscar os resultados de digitação do usuário no banco de dados
    const results = await TypingResults.findOne({ email });

    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: 'Resultados não encontrados.' });
    }
  } catch (error) {
    console.error('Erro ao buscar os resultados de digitação:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao buscar os resultados de digitação.' });
  }
}
