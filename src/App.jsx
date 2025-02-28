import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlantList from './pages/PlantList';
import PlantDetails from './pages/PlantDetails';
import CalendarPage from './pages/Calendar';
import Notifications from './components/Notifications';
import './App.css';PS C:\Users\awini\PLANTGUARD AI_APP> cd plantguard
cd : Cannot find path 'C:\Users\awini\PLANTGUARD AI_APP\plantguard' because it does not 
exist.
At line:1 char:1
+ cd plantguard
+ ~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Users\awini\..._APP\plantguard:String) 
    [Set-Location], ItemNotFoundException
    + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.SetLocationComm 
   

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Notifications />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/plants" replace />} />
            <Route path="/plants" element={<PlantList />} />
            <Route path="/plant/:id" element={<PlantDetails />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 