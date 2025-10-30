const express = require('express');
const router = express.Router();
const { create, getAll, getById, update, del } = require('../controllers/show.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', auth, admin, create);
router.put('/:id', auth, admin, update);
router.delete('/:id', auth, admin, del);

module.exports = router;
