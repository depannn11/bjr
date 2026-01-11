import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const { appId, count = 1 } = req.body;

  try {
    let db = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    const newCodes = [];

    for (let i = 0; i < count; i++) {
      const code = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();
      const newCode = {
        code,
        appId,
        account: 'acc_' + Math.random().toString(36).substring(2),
        note: 'Akun baru',
        used: false,
      };
      db.codes.push(newCode);
      newCodes.push(newCode);
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));

    res.status(200).json({ codes: newCodes });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}