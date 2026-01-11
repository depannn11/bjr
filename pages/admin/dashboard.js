import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [newAccount, setNewAccount] = useState({ appId: '', data: '', note: '' }); // Fix typo: data bukan ""

  const handleAddAccount = async () => {
    const res = await fetch('/api/addAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAccount),
    });
    if (res.ok) alert('Akun berhasil ditambahkan');
  };

  const handleGenerateCode = async () => {
    const res = await fetch('/api/generateCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId: 1, count: 1 }),
    });
    if (res.ok) alert('Kode berhasil dibuat');
  };

  const handleBroadcast = async () => {
    const res = await fetch('/api/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: broadcastMsg }),
    });
    if (res.ok) alert('Broadcast terkirim!');
  };

  useEffect(() => {
    setApps([{ id: 1, name: 'Game App' }]);
  }, []);

  return (
    <div className="dashboard">
      <Head><title>Admin Dashboard</title></Head>
      <h1>Admin Dashboard</h1>

      <section className="card">
        <h2>Tambah Akun</h2>
        <input
          type="number"
          placeholder="ID Aplikasi"
          value={newAccount.appId}
          onChange={(e) => setNewAccount({...newAccount, appId: e.target.value})}
        />
        <input
          type="text"
          placeholder="Data Akun"
          value={newAccount.data}
          onChange={(e) => setNewAccount({...newAccount, data: e.target.value})} // Fixed
        />
        <input
          type="text"
          placeholder="Catatan"
          value={newAccount.note}
          onChange={(e) => setNewAccount({...newAccount, note: e.target.value})}
        />
        <button className="btn-primary" onClick={handleAddAccount}>Tambah</button>
      </section>

      <section className="card">
        <h2>Generate Kode</h2>
        <button className="btn-primary" onClick={handleGenerateCode}>Buat Kode Baru</button>
      </section>

      <section className="card">
        <h2>Broadcast Notifikasi</h2>
        <textarea
          placeholder="Pesan Broadcast"
          value={broadcastMsg}
          onChange={(e) => setBroadcastMsg(e.target.value)}
        ></textarea>
        <button className="btn-primary" onClick={handleBroadcast}>Kirim</button>
      </section>
    </div>
  );
}