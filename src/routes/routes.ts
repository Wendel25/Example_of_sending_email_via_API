import { Router } from "express";
import { EmailController } from "../controllers/emailController";

const router = Router();
const emailController = new EmailController();

router.post("/send-email", emailController.sendEmail.bind(emailController));

export default router;
