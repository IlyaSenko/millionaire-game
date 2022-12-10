import { useState } from 'react';
import Start from 'phases/Start';

type TPhase = 'start' | 'game' | 'end';

function App(): JSX.Element | null {
  const [phase, setPhase] = useState<TPhase>('start');

  switch (phase) {
    case 'game':
      return null;
    case 'end':
      return null;
    default:
      return <Start />;
  }
}

export default App;
