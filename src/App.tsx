import { useCallback, useState } from 'react';
import Start from 'phases/Start';
import Game from 'phases/Game';

type TPhase = 'start' | 'game' | 'end';

function App(): JSX.Element | null {
  const [phase, setPhase] = useState<TPhase>('start');

  const handleStartGame = useCallback(() => {
    setPhase('game');
  }, []);

  switch (phase) {
    case 'game':
      return <Game />;
    case 'end':
      return null;
    default:
      return <Start onSubmit={handleStartGame} />;
  }
}

export default App;
