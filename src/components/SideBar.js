import React from 'react'
import Board from './Board'


function SideBar({clickHandler, countBingo})
{
	return(

		<div className='sidebar'>

		        <button className='myy' onClick={clickHandler} >Start</button> 
		        <p className='tc light-red'> BINGO:{countBingo}  </p>

		</div>
	)
}
export default SideBar