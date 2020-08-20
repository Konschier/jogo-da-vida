import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const numRows = 25;
const numCols = 40;

const operacoes = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const criaGridVazio = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }

  return rows;
}

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    return criaGridVazio()
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulacao = useCallback(() => {
    if(!runningRef.current){
      return;
    }
    setGrid((g) => {
      return produce(g, copiaGrid => { //g = grid atual
      for(let i = 0; i < numRows; i++){
        for (let k = 0; k < numCols; k++){
          let visinhos = 0;
          operacoes.forEach(([x, y]) => {
            const novoI = i + x;
            const novoK = k + y;
            if (novoI >= 0 && novoI < numRows && novoK < numCols){
              visinhos += g[novoI][novoK]
            }
          })

          if(visinhos < 2 || visinhos > 3){
            copiaGrid[i][k] = 0;
          }
          else if(g[i][k] === 0 && visinhos ===3){
            copiaGrid[i][k] = 1;
          }
        }
        }
     });
    });

    setTimeout(runSimulacao, 500);
  }, []);

  return (
    <>
    <button onClick={() => {
      setRunning(!running);
      if(!running){
      runningRef.current = true;
      runSimulacao();
      }
    }}
    >
      {running ? 'Stop' : 'Start'}
      </button>
      <button 
      onClick={() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numCols), () => (Math.random()> 0.5 ? 1 : 0))
          );
        }
      
        setGrid(rows);
      }}
      >
        randomico
      </button>
      <button 
      onClick={() => {
        setGrid(criaGridVazio());
      }}
      >
        clear
      </button>
   <div 
    style={{
     display: 'grid',
     gridTemplateColumns: `repeat(${numCols}, 20px)`
   }}>
    {grid.map((rows, i) =>
       rows.map((col, k) => <div 
       key={`${i}-${k}`}
       onClick={() => {
         const novoGrid = produce(grid, copiaGrid => {
           copiaGrid[i][k] = grid[i][k] ? 0 : 1;
         })
        setGrid(novoGrid)
       }}
       style={{
        width: 20,
        height: 20, 
        backgroundColor: grid[i][k] ? 'purple' : undefined,
        border: 'solid 1px black'
        }} />)
       )}
  </div>
  </>
  );
};

export default App;
