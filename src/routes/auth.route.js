const express=require('express');
// import express from 'express'
const { register, login } = require('../controllers/auth.controller');
const router=express.Router();

router.post('/register',register);
router.post('/login',login);

module.exports=router;