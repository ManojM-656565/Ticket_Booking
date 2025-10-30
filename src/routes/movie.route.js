const express=require("express");
const { getAll, getById, create, update, del } = require("../controllers/movie.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const router=express.Router();

router.get('/',getAll);
router.get('/:id',getById);

router.post('/create',authMiddleware,adminMiddleware,create);
router.put('/update/:id',authMiddleware,adminMiddleware,update);
router.delete('/:id',authMiddleware,adminMiddleware,del);

module.exports=router;