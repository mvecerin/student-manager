const router = require("express").Router();

// GET /api/users/me
router.get("/me", (req, res) => {
  res.json({ success: true, user: req.decoded });
});

module.exports = router;
