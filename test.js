// the below code performs BFS search and returns the result array



var shortestPathBinaryMatrix = function(grid) {
  if(grid[0][0] != 0) return []; // modify return type
  const queue = [[[0,0], 1]];
  const dest = [1,3];
  const visited = new Map();
  visited.set([0,0].toString(), null); // Mark source as visited

  const getNextSteps = ([x,y]) => {
      const dirs = [[1, 0], [-1, 0] , [0,1], [0,-1]];
      const nextSteps = [];
      for(const [nx, ny] of dirs) {
          if(grid[x + nx]?.[y + ny] == 0) nextSteps.push([x + nx, y + ny]);
      }
      return nextSteps;
  }
  
  for (let [curr, distance] of queue) {
      // Move the visited check to the loop
      if (curr[0] === dest[0] && curr[1] === dest[1] && grid[dest[0]][dest[1]] == 0) {
          // Derive the path from the linked list we now have in the visited structure:
          let path = [];
          while (curr) {
              path.push(curr);
              curr = visited.get(curr.toString());
          }
          return path.reverse(); // Need to reverse to get from source to destination
      }
      for (let adj of getNextSteps(curr)) {
          // Visited-check moved here:
          if (visited.has(adj.toString())) continue; 
          // Mark with the coordinates of the previous node on the path:
          visited.set(adj.toString(), curr);
          queue.push([adj, distance + 1]);
      }
  }
  
  return []; // must modify this as well
};

// demo
let grid = [
  [0,0,0,1],
  [1,1,0,0],
  [1,1,0,1]
];
let result = shortestPathBinaryMatrix(grid);
// just calculate the length of the result and multiply by 100 to get the total cost
console.log(result);