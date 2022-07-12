/* eslint-disable object-shorthand */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async (req, res) => {
  dbConnect();
  const {
    query: { email },
    method,
  } = req;

  if (method === 'PUT') {
    try {
      const user = await User.updateOne({ email: email }, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        res.status(400).json({ success: false });
      }

      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  } else if (method === 'GET') {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        res.status(400).json({ success: false });
      }

      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
};
