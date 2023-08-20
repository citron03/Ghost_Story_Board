import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import logger from "../logger";
import nodemailer from "nodemailer";

const utilsRouter = Router();

utilsRouter.get(
  "/test-email",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("email-test on");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_SENDER_USER,
        pass: process.env.MAIL_SENDER_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: `"WDMA Team" <${process.env.MAIL_SENDER_USER}>`,
      to: "cchan11@naver.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    logger.info(info);
    res.status(200).json({ message: "mail sended" });
  }
);

export default utilsRouter;
