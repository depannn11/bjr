import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    res.status(200).json(data.notifications.slice(-10).reverse());
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}