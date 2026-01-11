import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const { username, password, role } = req.body;

  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    const user = data.users.find(u => u.username === username && u.role === role);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.setHeader('Set-Cookie', `auth-token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`);

    res.status(200).json({ role: user.role });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}