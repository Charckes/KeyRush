import mongoose from 'mongoose';

const db = async () => {
  try {
    // Verifica se a conexão com o banco de dados já está estabelecida
    if (mongoose.connection.readyState === 1) {
      return;
    }

    // Conecta-se ao banco de dados
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    // Trata erros de conexão com o banco de dados
    console.error(error);
    throw new Error('Erro ao conectar-se ao banco de dados');
  }
};

export default db;
