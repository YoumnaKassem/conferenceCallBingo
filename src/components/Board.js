import React, {useState, useEffect} from 'react'
import shuffle from "shuffle-array"
import Square from './Square'
import SideBar from './SideBar'
import {intersection, isEqual} from 'lodash'

const Board=({items, winPossibilities})=> 
{

  const [squares, setSquares] = useState({})
  const [selectedSquares, setSelectedSquare] = useState([12])
  const [winnedSquares, setWinnedSquares] = useState([])
  const [winningPossibilities, setWinningPossibility] = useState(winPossibilities) 
  const [countBingo, setCountBingo] = useState(0)
  const [startNewGame, setStartNewGame] = useState(false)

  // to be invoked when user click on 'Start' button to set all states as new game. 
  const startNewGameClickHandler=()=>
  {
    setWinningPossibility(winPossibilities)
    setCountBingo(0)
    setSelectedSquare([12])
    setWinnedSquares([])
    setStartNewGame(prev=>{
      return !prev
    })
  }

  // to be invoked when user click on any bingo square phrase to add this square to SelectedSquares
  const choseItem = (id)=>
  {
    if (selectedSquares.includes(Number(id))) return null
    setSelectedSquare([...selectedSquares, Number(id)])    
  }

  // randomly arrange all bingo items 
  useEffect(() => 
  {
    choseItem(12)
    const data = shuffle(items).reduce(
      (data, value, index) => ({ ...data, [index]: value }),
      {}    
    );
    setSquares(data)
  }, [startNewGame])

  useEffect(()=> 
  {
    const isWin = (selectedSquares) => 
    {
      
      for (let i = 0; i < winningPossibilities.length; i++) 
      {
        if (intersection(selectedSquares, winningPossibilities[i]).length > 4) 
        {
          let win = winningPossibilities[i]
          setCountBingo(prev=>{
            return prev +1
          })
          //remove this possibilty from winning possibilties array
          winningPossibilities.splice(i,1 )
          setWinningPossibility(winningPossibilities)
          const addToWinnedSquares = winnedSquares.concat(win)
          setWinnedSquares(addToWinnedSquares)
          return true
         }
      }
      return false
    }     
    isWin(selectedSquares)
  },[selectedSquares])

  // to be invoked whenever the user have selected all the 25 bingo squares. 
  if (selectedSquares.length>24) 
  {

    return (
      <>
      <button onClick={startNewGameClickHandler} >Start a game</button>
       <main>
        {Object.keys(squares).map(key => (
          <Square key={key} id={key}  allBingoSquaresAreSelected={true} text={squares[key]}/>
       ))}
       </main>
       </>
    )
  }
 
  return (
    <div className='main-container'>
      <SideBar clickHandler={startNewGameClickHandler} countBingo={countBingo} />
      <main className='board'>
      {
          Object.keys(squares).map(key => (
          <Square key={key} id={key} text={squares[key]} areChecked={selectedSquares}  onChecked={(e)=> {
               e.preventDefault()
               choseItem(key)} 
              } winnedSquares={winnedSquares} />  
          )
         )
      }
      </main>
    </div>
    )
}
export default Board;
