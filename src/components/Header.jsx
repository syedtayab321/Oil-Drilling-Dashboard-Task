import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [openTabs, setOpenTabs] = useState({
    drilling: true,
    offsetWells: true,
    bitSummary: true,
  });

  const closeTab = (tab, path) => {
    setOpenTabs((prev) => ({ ...prev, [tab]: false }));
    if (window.location.pathname === path) {
      navigate('/drilling-monitoring');
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <span className="text-[#FF6B00] font-bold mr-2">◈</span>
        <span className="font-semibold">Drill AI Intelligence Platform</span>
      </div>
      <nav className="flex items-center space-x-4">
        {openTabs.drilling && (
          <NavLink
            to="/drilling-monitoring"
            className={({ isActive }) => `font-semibold ${isActive ? '' : 'text-gray-600'}`}
          >
            Drilling Monitoring
            {!openTabs.drilling && <span className="text-red-500 ml-1">x</span>}
          </NavLink>
        )}
        {openTabs.offsetWells && (
          <NavLink
            to="/offset-wells-map"
            className={({ isActive }) => `${isActive ? 'font-semibold' : 'text-gray-600'}`}
          >
            Offset Wells Map
            <span className="text-red-500 ml-1 cursor-pointer" onClick={() => closeTab('offsetWells', '/offset-wells-map')}>
              x
            </span>
          </NavLink>
        )}
        {openTabs.bitSummary && (
          <NavLink
            to="/bit-summary"
            className={({ isActive }) => `${isActive ? 'font-semibold' : 'text-gray-600'}`}
          >
            Bit Summary
            <span className="text-red-500 ml-1 cursor-pointer" onClick={() => closeTab('bitSummary', '/bit-summary')}>
              x
            </span>
          </NavLink>
        )}
        <button className="bg-[#22C55E] text-white px-3 py-1 rounded">✓ Filter</button>
        <button className="bg-[#3B82F6] text-white px-3 py-1 rounded">Upload</button>
        <span className="text-gray-400">○</span>
        <input
          type="text"
          placeholder="Q"
          className="border rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-gray-200 px-3 py-1 rounded text-gray-700">Drill AI</button>
        <button className="text-[#3B82F6]">Clear History</button>
      </nav>
    </header>
  );
};

export default Header;