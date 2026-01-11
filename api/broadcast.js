import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const { message } = req.body;

  try {
    let db = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    const notif = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
    };
    db.notifications.push(notif);
    await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));

    res.status(200).json({ msg: 'Broadcast sent!', notification: notif });
  } catch (err) {
    res.status(