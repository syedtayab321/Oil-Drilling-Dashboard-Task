import { useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { selectedWell, uploadedData, setUploadedData } = useContext(AppContext);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedData(res.data.data);
      setUploadStatus('Success: File uploaded and data visualized.');
    } catch (err) {
      setUploadStatus(`Error: Upload failed. ${err.message}`);
    }
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
      {selectedWell && (
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-md">
          Details for {selectedWell.name} (Depth: {selectedWell.depth} ft)
        </h2>
      )}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Well Data</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer file:shadow-md"
        />
      </div>
      {uploadStatus && (
        <p className={`text-lg font-semibold mb-6 p-3 rounded-lg shadow-sm ${uploadStatus.startsWith('Success') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
          {uploadStatus}
        </p>
      )}
      {uploadedData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rock Composition Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Rock Composition</h3>
            <BarChart width={300} height={400} data={uploadedData} layout="horizontal" className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" stroke="#4a5568" />
              <YAxis dataKey="depth" reversed={true} domain={['auto', 'auto']} stroke="#4a5568" />
              <Tooltip contentStyle={{ backgroundColor: '#f7fafc', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '14px', color: '#2d3748' }} />
              <Bar dataKey="rock_composition" fill="#8884d8" barSize={20} />
            </BarChart>
          </div>

          {/* DT Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">DT (μs/ft)</h3>
            <LineChart width={300} height={400} data={uploadedData} className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="depth" reversed={true} orientation="top" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip contentStyle={{ backgroundColor: '#f7fafc', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '14px', color: '#2d3748' }} />
              <Line type="monotone" dataKey="DT" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </div>

          {/* GR Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">GR (API)</h3>
            <LineChart width={300} height={400} data={uploadedData} className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="depth" reversed={true} orientation="top" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip contentStyle={{ backgroundColor: '#f7fafc', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '14px', color: '#2d3748' }} />
              <Line type="monotone" dataKey="GR" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;