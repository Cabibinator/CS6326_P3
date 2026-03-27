import { useState } from 'react'
import './App.css'
import NavigationHeader from './Navigation.jsx'
import VideoDashboard from './Dashboard.jsx'
import FeedbackPage from './Feedback.jsx'
import AnalysisPage from './Analysis.jsx'

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div id="appContainer">
      <NavigationHeader page={page} setPage={setPage} />
      <div class="container container-fluid" id="page">
        {page === "dashboard" && <VideoDashboard /> }
        {page === "feedback" && <FeedbackPage/> }
        {page === "analysis" && <AnalysisPage />  }
      </div>
    </div>
  );
}

export default App;