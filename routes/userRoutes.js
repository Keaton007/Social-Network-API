const router = require('express').Router();
const { User } = require('../models');

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    res.json(user);
  });

router.get('/', async (req, res) => {
  const users = await User.find().populate('thoughts').populate('friends');
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.post('/:userId/friends/:friendId', async (req, res) => {
  await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } });
  res.json({ message: 'Friend added' });
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } });
  res.json({ message: 'Friend removed' });
});

module.exports = router;
