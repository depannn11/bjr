import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const { code } = req.body;

  try {
    let data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));

    const found = data.codes.find(c => c.code === code && !c.used);
    if (!found) return res.status(404).json({ msg: 'Invalid or already used code' });

    found.used = true;
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

    res.status(200).json({
      msg: 'Redeem success',
      account: found.account,
      note: found.note,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}