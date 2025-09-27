import React, { useContext } from 'react';
import { AppContext } from './../context/AppContext';

const WellList = ({ wells }) => {
  const { selectedWell, setSelectedWell } = useContext(AppContext);

  return (
    <aside className="w-1/5 border-r border-gray-200 p-4 overflow-y-auto md:block hidden">
      <h2 className="font-semibold mb-4">Well List</h2>
      <ul>
        {wells.map((well, index) => (
          <li
            key={index}
            className={`cursor-pointer mb-2 ${selectedWell?.name === well.name ? 'font-bold' : ''}`}
            onClick={() => setSelectedWell(well)}
          >
            {well.name}
            <br />
            Depth: {well.depth} ft
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default WellList;