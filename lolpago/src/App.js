import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './Loading';
import Search from './Search';
import SearchSummoner from './SearchSummoner';
import AnalysisReport from './AnalysisReport';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/search" element={<Search />} />
          <Route path="/summoner/:id" element={<SearchSummoner />} />
          <Route path="/summoner/:id/:champ" element={<AnalysisReport />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
