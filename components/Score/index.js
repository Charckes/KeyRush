import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Score = () => {
    const { data: session } = useSession();
    const [score, setScore] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
  
    useEffect(() => {
      // Buscar os resultados do usuário quando o componente for montado
      fetch(`/api/score/results?+id=${session?.user?.email}`)
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Verificar o conteúdo da resposta
        // Resto do código...
      })
      .catch((error) => {
        console.error('Erro ao buscar os resultados de digitação:', error);
      });
    }, [session]);
  
    return (
      <div>
        <h2>Resultados de Digitação:</h2>
        <p>Acertos: {score}</p>
        <p>Erros: {errorCount}</p>
      </div>
    );
  };
  

export default Score