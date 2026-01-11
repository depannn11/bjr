import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function UserDashboard() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleRedeem = async () => {
    const res = await fetch('/api/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (res.ok) setResult(data);
    else setResult({ error: data.msg });
  };

  const fetchNotifs = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  return (
    <div className="dashboard">
      <Head><title>User Dashboard</title></Head>
      <h1>User Dashboard</h1>

      <section className="card">
        <h2>Redeem Kode</h2>
        <input
          type="text"
          placeholder="Masukkan kode redeem"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn-primary" onClick={handleRedeem}>Redeem</button>
        {result && (
          <div className="result">
            <p>Akun: {result.account}</p>
            <p>Catatan: {result.note}</p>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Notifikasi</h2>
        {notifications.length > 0 ? (
          notifications.map(n => <p key={n.id}>{n.message}</p>)
        ) : <p>Tidak ada notifikasi.</p>}
      </section>
    </div>
  );
}