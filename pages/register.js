import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      alert('Akun berhasil dibuat!');
      window.location.href = '/';
    } else {
      setError(data.msg);
    }
  };

  return (
    <div className="login-page">
      <Head>
        <title>Register - Akun Manager</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="login-box">
        <h1>Daftar Akun</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Daftar</button>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="register-link">
          <Link href="/">Sudah punya akun? Login di sini</Link>
        </div>
      </div>
    </div>
  );
}