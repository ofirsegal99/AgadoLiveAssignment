import React from 'react';
import MultipleClocksPage from 'Pages/MultipleClocksPage';
import { ContextProvider } from 'Context/Context';
function App() {
  return (
    <div className="App">
      <ContextProvider>
        <MultipleClocksPage/>
      </ContextProvider>
    </div>
  );
}

export default App;
