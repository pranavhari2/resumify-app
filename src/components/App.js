import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home'
import CoverLetter from './CoverLetter'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/generate" element={<CoverLetter/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
