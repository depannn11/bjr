import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const { appId, data, note } = req.body;

  try {
    let db = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    const newAcc = { id: Date.now(), appId, data, note };
    db.accounts.push(newAcc);
    await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));

    res.status(201).json({ msg: 'Akun berhasil ditambahkan', account: newAcc });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}