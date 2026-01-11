import connectDB from '../../lib/db';
import User from '../../lib/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ msg: 'Username sudah digunakan!' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, role: 'user' });
  await newUser.save();

  res.status(201).json({ msg: 'Berhasil mendaftar!' });
}