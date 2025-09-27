import { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from './../context/AppContext';

const Chatbot = () => {
  const { chatHistory, setChatHistory, uploadedData } = useContext(AppContext);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input) return;
    const newHistory = [...chatHistory, { role: 'user', text: input }];
    setChatHistory(newHistory);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        query: input,
        data: uploadedData,
      });
      setChatHistory([...newHistory, { role: 'bot', text: res.data.response }]);
    } catch (err) {
      setChatHistory([...newHistory, { role: 'bot', text: 'Error: Could not get response.' + err.message }]);
    }
  };

  return (
    <aside className="w-1/4 border-l border-gray-200 flex flex-col md:block">
      <div className="p-4 border-b">
        <button className="bg-blue-200 text-blue-800 px-3 py-1 rounded">Click to start voice chat!</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`p-2 rounded ${msg.role === 'bot' ? 'bg-blueChat self-start' : 'bg-gray-200 self-end'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type messages here"
          className="flex-1 border rounded px-2 py-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="ml-2">➤</button>
      </div>
    </aside>
  );
};

export default Chatbot;