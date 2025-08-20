const express = require('express');
const router = express.Router();
const {
  getAllJudges,
  verifyJudge,
  getAllLawyers,
  verifyLawyer,
  getAllUsers
} = require('../controllers/adminController');

router.get('/judges', getAllJudges);
router.patch('/verify-judge/:id', verifyJudge);

router.get('/lawyers', getAllLawyers);
router.patch('/verify-lawyer/:id', verifyLawyer);
router.get('/users', getAllUsers);

module.exports = router;
