import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { useSession } from 'next-auth/react';

const Typing = () => {
  const { data: session } = useSession();
  console.log(session)
  const phrases = [
    'A verdade, é que dói lembrar dela.',
    'Imagine uma nova história para sua vida e acredite nela.',
    'Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado.',
    'No mundo do aleatório a ordem é não se preocupar.',
    'A complexidade fascinante do universo da ciência se revela em uma intrincada teia de descobertas, teorias e fenômenos, que abrangem desde a imensidão do cosmos até os mecanismos minuciosos que regem a vida em escala molecular, proporcionando um verdadeiro banquete intelectual para aqueles que se aventuram na busca pelo conhecimento e na compreensão das leis fundamentais que governam o mundo ao nosso redor, revelando assim as maravilhas da física, da química, da biologia e de tantas outras disciplinas científicas que se entrelaçam, desvendando os segredos do passado, decifrando os enigmas do presente e construindo as bases para um futuro repleto de avanços tecnológicos, inovações e soluções para os desafios que enfrentamos como sociedade, impulsionando assim o progresso humano rumo a horizontes cada vez mais promissores e revelando as maravilhas ocultas que habitam os reinos da ciência.',
  ];
  const randomIndex = Math.floor(Math.random() * phrases.length)
  const randomPhrase = phrases[randomIndex]
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [phrase, setPhrase] = useState(randomPhrase);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Adicionar event listener ao body para redirecionar o foco para o input
    document.body.addEventListener('click', handleBodyClick);

    // Remover o event listener ao desmontar o componente
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const handleBodyClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInput(value);
    setProgressIndex(value.length);

    if (value.length > phrase.length) {
      handleResult();
    }
  };

  const handleResult = () => {
    const newScore = input.split('').reduce((acc, char, index) => {
      if (char === phrase[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(newScore);

    const newErrorCount = input.split('').reduce((acc, char, index) => {
      if (char !== phrase[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setErrorCount(newErrorCount);

    setCompleted(true);

    // Verificar se o userId está definido
    const userId = session?.user?.email;
    if (!userId) {
      console.error('UserId não está definido.');
      return;
    }

    // Enviar os dados para o servidor
    const data = {
      userId: session?.user?.email,
      score: newScore,
      errorCount: newErrorCount
    };

    fetch('/api/score/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          console.log('Dados enviados com sucesso para o banco de dados!');
        } else {
          console.error('Falha ao enviar os dados para o banco de dados.');
        }
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados para o servidor:', error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Impede a ação padrão da tecla Backspace
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNext = () => {
    setCompleted(false);
    setProgressIndex(0);
    setInput('');
    setScore(0);
    setErrorCount(0);
    const nextPhraseIndex = currentPhrase + 1;

    if (nextPhraseIndex < phrases.length) {
      setCurrentPhrase(nextPhraseIndex);
      setPhrase(phrases[nextPhraseIndex]);
    } else {
      setCurrentPhrase(0);
      setPhrase(phrases[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        {phrase.split('').map((letter, index) => {
          const isLetterCorrect = input[index] === letter;
          const isCurrent = index === progressIndex;
          const letterClass = isLetterCorrect ? styles.correct : styles.incorrect;
          const progressClass = isCurrent ? styles.progress : '';

          return (
            <span
              key={index}
              className={`${letterClass} ${progressClass}`}
            >
              {letter}
            </span>
          );
        })}
      </div>
      {completed ? (
        <div className={styles.pontos}>
          <span className={`${styles.acertos} ${styles.item}`}>Acertos: {score}</span>
          <span className={`${styles.erros} ${styles.item}`}>Erros: {errorCount}</span>
          <button className={`${styles.button} ${styles.item}`} onClick={handleNext}>Próximo</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className={styles.input}
          />
        </form>
      )}
    </div>
  );
};

export default Typing;
