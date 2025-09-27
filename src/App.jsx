import React, {useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WellList from './components/WellList';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import OffsetWellsMap from './components/OffsetWellsMap';
import BitSummary from './components/BitSummary';
import { AppContext } from './context/AppContext';

const mockWells = [
  { name: 'Well A', depth: 5000 },
  { name: 'Well AA', depth: 4500 },
  { name: 'Well AAA', depth: 5200 },
  { name: 'Well B', depth: 4800 },
];

const App = () => {
  const [selectedWell, setSelectedWell] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: "Hi, I'm Drill AI. Ask me anything about this well!" },
  ]);

  return (
    <Router>
      <AppContext.Provider value={{ selectedWell, setSelectedWell, uploadedData, setUploadedData, chatHistory, setChatHistory }}>
        <div className="flex flex-col h-screen bg-white">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <WellList wells={mockWells} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/drilling-monitoring" element={<Dashboard />} />
              <Route path="/offset-wells-map" element={<OffsetWellsMap />} />
              <Route path="/bit-summary" element={<BitSummary />} />
            </Routes>
            <Chatbot />
          </div>
        </div>
      </AppContext.Provider>
    </Router>
  );
};

export default App;