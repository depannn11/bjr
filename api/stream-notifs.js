import connectDB from '../../lib/db';
import Notification from '../../lib/models/Notification';

export default async function handler(req, res) {
  await connectDB();

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const interval = setInterval(async () => {
    const latest = await Notification.findOne({}).sort({ createdAt: -1 });
    if (latest) {
      res.write(` ${JSON.stringify(latest)}\n\n`);
    }
  }, 10000);

  req.on('close', () => clearInterval(interval));
}