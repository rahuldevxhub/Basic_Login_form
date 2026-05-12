import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//regiter
router.post('/register',registerController);

router.get("/home",authMiddleware ,(req, res) => {
  res.json({
    success:true,
    message: "Welcome Home",
    user: req.user
  });
});

//login
router.post('/login',loginController);

export default router;