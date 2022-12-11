import { useCallback, useState } from 'react';
import Start from 'phases/Start';
import Game from 'phases/Game';
import End from 'phases/End';

type TPhase = 'start' | 'game' | 'end';

function App(): JSX.Element | null {
  const [phase, setPhase] = useState<TPhase>('start');

  const handleStartGame = useCallback(() => {
    setPhase('game');
  }, []);

  const handleFinishGame = useCallback(() => {
    setPhase('end');
  }, []);

  const handleRestartGame = useCallback(() => {
    setPhase('start');
  }, []);

  switch (phase) {
    case 'game':
      return <Game onFinish={handleFinishGame} />;
    case 'end':
      return <End onSubmit={handleRestartGame} />;
    default:
      return <Start onSubmit={handleStartGame} />;
  }
}

export default App;
