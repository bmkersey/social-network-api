const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req,res) => {
  res.status(404).send("<h1>This isn't the page you are looking...it maybe lost!")
});

module.exports = router