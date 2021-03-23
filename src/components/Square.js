import React from 'react'
import classNames from 'classnames';
function Square({text, areChecked,onChecked, id, allBingoSquaresAreSelected, winnedSquares}) 
{
  let squareStyle=classNames({
      'bingo-square':true,
      'isChecked':false,
      'winned-line':false,
      'shadow-1':true,
      'avenir':true,
      'fw7':true,
      'shadow-hover':true
  })
  let whenAllSquaresCheckedStyle=classNames({
      'bingo-square':true,
      'winned-line':true,
      'all-squares-checked':true
  })
  let noId=Number(id)

  if(allBingoSquaresAreSelected)
  {
      return(
        <div  className={whenAllSquaresCheckedStyle} >
          {text}
        </div>
      );
  }

  if(areChecked.includes(noId) && id !== '12' )
   {
      if(winnedSquares.includes(noId) && id !== '12' )
      {   
        squareStyle=classNames({
        'bingo-square':true,
        'isChecked':false,
        'winned-line':true

        })
      }
      else
      {
        squareStyle=classNames({
          'bingo-square':true,
          'isChecked':true,
          'winned-line':false
        })
      }
    }
  return (
    <>
      {
        id !== '12' ? (
          <div className={squareStyle} onClick={onChecked} >
          {text}
          </div>
        )
        :
        (
          <div className={'bingo-square  bingo-center-square'}>
          {<p className={'grow b-ns light-red'}>Conference Call Bingo</p>}
          </div>
        )
      }
    </>
  );
}
export default Square;
