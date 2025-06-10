import { useState, useEffect } from 'react';

export default function App() {
  const [status, setStatus] = useState({});
  const [requests, setRequests] = useState(10);
  const [memory, setMemory] = useState(false);
  const [cpu, setCpu] = useState(false);

  const sendRequest = () => {
    fetch('/api/stress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests, memory, cpu })
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/status')
        .then(res => res.json())
        .then(data => setStatus(data));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div
    style={{
      padding: 20,
      minHeight: '100vh',
      backgroundImage: 'url("/system-load-bg.jpg")',  // make sure image is in public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#E0E0E0',         //               // white text for contrast
      fontWeight: 'bold',
      textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}
  >
    <h2>Stress Control UI</h2>
    <div>
      <label>Requests: </label>
      <input type="number" value={requests} onChange={e => setRequests(+e.target.value)} />
    </div>
    <div>
      <label><input type="checkbox" checked={memory} onChange={() => setMemory(!memory)} /> Memory Load</label>
    </div>
    <div>
      <label><input type="checkbox" checked={cpu} onChange={() => setCpu(!cpu)} /> CPU Load</label>
    </div>
    <button onClick={sendRequest}>Start Load</button>
    <h3>Status</h3>
    <textarea
  value={JSON.stringify(status, null, 2)}
  readOnly
  rows={10}
  style={{ width: '100%', backgroundColor: '#222', color: '#E0E0E0', borderRadius: 5, padding: 10, fontFamily: 'monospace' }}
/>

  </div>
);

}