import './App.css'
import Board from './components/Board'
import {items, posibilities} from './utils/mockdata'
import 'tachyons';

function App()
 {
  return (
    <div className="App">    
    		
            <Board items={items} winPossibilities={posibilities}></Board>        
    </div>
  );
 }

export default App;
