import { useState } from "react"


const App = () => {

  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null))

  const [isXTurn, setIsXTurn] = useState<boolean>(true)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
  ]

  function getWinner(squares: Array<string | null>): string | null {
    for(const combination of winningCombinations){
      const [a, b, c] = combination
      if(
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] 
      ) {
        return squares[a]
      } 
    }
    return null
  }

  function handleSquareClick(index: number) {
    if(board[index] || getWinner(board)) return;

    const updatedBoard = [...board]
    updatedBoard[index] = isXTurn ? 'X' : 'O'

    setBoard(updatedBoard)
    setIsXTurn(!isXTurn)
  }

  function getGameStatus(): string {
    const winner = getWinner(board)

    if(winner) return `Winner: ${winner}`

    if(board.every(square => square !== null)) {
      return "It is a Draw!"
    }

    return `Next Player: ${isXTurn ? 'X' : 'O'}`
  }

  function resetGame(): void {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
  }


  return (
    <div className="min-h-screen bg-slate-950 flex
     items-center justify-center">

      <div className="w-full max-w-100 mx-5 ">
        <h1 className="text-white text-5xl font-semibold">Tic Tac Toe</h1>
        
        <div className={`text-center mb-6 ${getWinner(board) ? 'text-2xl font-bold text-green-400 animate-bounce' : 'text-xl text-white'}`}>
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button key={index}
            onClick={() => handleSquareClick(index)}
            className={`h-32 w-full bg-gray-800 rounded-me text-6xl font-light transition-colors-duration-400 ${square === 'X' ? 'text-white' : 'text-slate-400'}`}
            >
              {square}
            </button>
          ))}
        </div>

        <button className="w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-750"
        onClick={() => resetGame()}
        >
          New Game
        </button>

      </div>

    </div>
  )
}

export default App

