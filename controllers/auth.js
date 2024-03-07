import userSchema from "../models/auth.js";
import tokenSchema from "../models/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();

export const signUp = async (req, res) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = new userSchema({
      email: req.body.email,
      password: hashedPassword,
      verified: false,
    });
    const newToken = new tokenSchema({
      user_id: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    await newUser.save();
    await newToken.save();
    const config = {
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    transporter
      .sendMail({
        from: process.env.MY_EMAIL,
        to: req.body.email,
        subject: "test email from nodeJS",
        text: "hello with nodemailer",
        html: `<div>klik <a href="http://localhost:5500/auth/v1/verify/${newToken.token}" >link</a> ini untuk verifikasi akun </div>`,
      })
      .then(() => {
        return res.status(203).json({
          message: "berhasil membuat akun",
          verification:
            "silahkan verifikasi melalui email yang telah kami kirim ke email anda",
        });
      })
      .catch((err) => {
        return res.status(200).json({ message: err }, console.log(err));
      });
  } catch (error) {
    return res
      .status(501)
      .json({ message: `email ${error.keyValue.email} sudah terdaftar` });
  }
};

export const login = async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  try {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(400).json("masukkan password");
        if (!result) {
          return res.status(404).json("wrong password");
        } else {
          if (user.verified) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            const { $__, $isNew, ...val } = user;
            const { password, ...dataUser } = val._doc;
            return res
              .status(200)
              .cookie("accessToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              })
              .json(dataUser);
          } else {
            return res.status(200).json({
              message:
                "akun belum diverifikasi, silahkan verifikasi terlebih dahulu melalui email yang kami kirim",
            });
          }
        }
      });
    } else {
      return res.status(404).json("user not found!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json("user has been loged out");
};

export const verifyEmail = async (req, res) => {
  const token = await tokenSchema.findOne({ token: req.params.token });
  const user = await userSchema.findById({ _id: token.user_id });
  try {
    await tokenSchema.deleteOne(token);
    await userSchema.updateOne(user, { $set: { verified: true } });
    return res
      .status(200)
      .json("berhasil aktivasi akun! silahkan login kembali");
  } catch (error) {
    return res.status(500).json("failed to verify");
  }
};
