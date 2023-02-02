const Channels = require('pusher');

const appId = "1547330";
const key = "97d5049f82bf14ced9b1";
const secret = "b633ce877beb5f29f765";
const cluster = "eu";

const channels = new Channels({
  appId,
  key,
  secret,
  cluster,
});

module.exports = (req, res) => {
  const data = req.body;
  channels.trigger('event-channel', 'event-name', data, () => {
    res.status(200).end('sent event successfully');
  });
};