function hanoiAStar() {
    const startState = [[3, 2, 1], [], []];
    const endState = [[], [], [3, 2, 1]];
    let openList = [[startState, 0]];
    let closedList = [];
    
    while (openList.length > 0) {
      const [currentState, currentG] = openList.reduce((prev, curr) => 
        curr[1] < prev[1] ? curr : prev);
      openList = openList.filter(state => state[0] !== currentState);
      closedList.push([currentState, currentG]);
      
      if (JSON.stringify(currentState) === JSON.stringify(endState)) {
        return currentG;
      }
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i !== j && currentState[i].length > 0) {
            const newState = currentState.map(arr => arr.slice());
            const disk = newState[i].pop();
            newState[j].push(disk);
            const newG = currentG + 1;
            const newF = newG + 2 ** newState[2].length - 1;
            
            if (closedList.some(state => JSON.stringify(state[0]) === JSON.stringify(newState))) {
              continue;
            }
            
            const openState = openList.find(state => JSON.stringify(state[0]) === JSON.stringify(newState));
            if (openState && openState[1] > newG) {
              openState[1] = newG;
            } else if (!openState) {
              openList.push([newState, newG]);
            }
          }
        }
      }
    }
    
    return null;
  }