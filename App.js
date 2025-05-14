import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/services/db';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    initDB();  
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  return isReady && <AppNavigator />;
}
export default App;
