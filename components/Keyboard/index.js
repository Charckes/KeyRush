import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './styles.module.css';

const Keyboard = ({ handleKeyPress }) => {
  const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
  const [activeKey, setActiveKey] = useState('');

  const handleKeyDown = (event) => {
    const { key } = event;
    if (keys.includes(key.toLowerCase())) {
      setActiveKey(key.toLowerCase());
      handleKeyPress(key.toLowerCase());
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <TransitionGroup className={styles.keyboard}>
      {keys.map((key) => (
        <CSSTransition key={key} classNames={styles.keyTransition} timeout={200}>
          <button
            className={styles.key + (activeKey === key ? ' ' + styles.active : '')}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Keyboard;
