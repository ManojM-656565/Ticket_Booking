const express = require('express');
const router = express.Router();
const {
  getAll,create,update,del
} = require('../controllers/theatre.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

router.get('/', getAll);

router.post('/create', auth, admin, create);
router.put('/:id', auth, admin, update);
router.delete('/:id', auth, admin, del);

module.exports = router;
