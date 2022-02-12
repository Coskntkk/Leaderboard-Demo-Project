import {
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Ranking from './components/Ranking';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/:username" element={<Ranking />} />
      </Routes>
    </div>
  );
}

export default App;
