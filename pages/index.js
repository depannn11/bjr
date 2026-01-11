import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LoginPage() {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await res.json();

    if (res.ok) {
      document.cookie = `user-role=${data.role}; Path=/;`;
      window.location.href = data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    } else {
      setError(data.msg);
    }
  };

  return (
    <div className="login-page">
      <Head>
        <title>Login - Akun Manager</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="login-box">
        <h1>Akun Manager</h1>
        <form onSubmit={handleSubmit}>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Login Sebagai User</option>
            <option value="admin">Login Sebagai Admin</option>
          </select>
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
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="register-link">
          <Link href="/register">Belum punya akun? Daftar di sini</Link>
        </div>
      </div>
    </div>
  );
}