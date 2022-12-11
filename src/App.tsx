import { useCallback, useState } from 'react';
import Start from 'phases/Start';
import Game from 'phases/Game';
import End from 'phases/End';

type TPhase = 'start' | 'game' | 'end';

function App(): JSX.Element | null {
  const [phase, setPhase] = useState<TPhase>('start');
  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const handleStartGame = useCallback(() => {
    setPhase('game');
  }, []);

  const onCorrectAnswer = useCallback(() => {
    if (currentQuestionId < 12) {
      setCurrentQuestionId(currentQuestionId + 1);
      return;
    }
    setCurrentQuestionId(currentQuestionId + 1);
    setPhase('end');
  }, [currentQuestionId]);

  const onWrongAnswer = useCallback(() => {
    setPhase('end');
  }, []);

  const handleRestartGame = useCallback(() => {
    setCurrentQuestionId(1);
    setPhase('start');
  }, []);

  switch (phase) {
    case 'game':
      return (
        <Game
          currentQuestionId={currentQuestionId}
          onCorrectAnswer={onCorrectAnswer}
          onWrongAnswer={onWrongAnswer}
        />
      );
    case 'end':
      return <End questionId={currentQuestionId} onSubmit={handleRestartGame} />;
    default:
      return <Start onSubmit={handleStartGame} />;
  }
}

export default App;
