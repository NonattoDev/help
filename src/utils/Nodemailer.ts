import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "devhelpreforcoescolar@gmail.com",
    pass: "fwbe zzje ymqo iefs",
  },
});
