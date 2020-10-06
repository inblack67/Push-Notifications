import handler from '../../src/handler';
import axios from 'axios';
import asyncHandler from '../../middlewares/asyncHandler';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:test@test.com',
  process.env.WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

export default handler
  .get(
    asyncHandler(async (req, res) => {
      const apiRes = await axios(`https://jsonplaceholder.typicode.com/posts`);
      return res
        .status(200)
        .json({ success: true, msg: 'API up and running', data: apiRes.data });
    })
  )
  .post((req, res) => {
    const subscription = req.body;
    res.status(201).json({ success: true, msg: 'subscription received' });
    const payload = JSON.stringify({ title: 'Push Test' });
    webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.error(err));
  });
