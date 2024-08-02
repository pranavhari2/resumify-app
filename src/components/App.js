import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home'
import CoverLetter from './CoverLetter'; 
import MenuBar from './MenuBar'

function App() {
  return (
    <Router>
      <div>
        <MenuBar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/generate" element={<CoverLetter/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
