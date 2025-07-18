import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { loginSchema, userSchema } from "../lib/zod";
import { generateToken } from "../utility/utility";

export const signupUser: RequestHandler = async (req, res) => {
  try {
    const {name, email ,password , confirmPassword } = req.body;
    //to check whether the passwords match
    if(password !== confirmPassword ) {
      res.status(401).json({mssg:"passwords do not match"});
      return;
    }

    userSchema.parse({name,email,password});

    // Check whether user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(409).json({ mssg: "user already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });

    generateToken(newuser.id, res);

    res.status(201).json({
      mssg: "user created successfully",
      user: {
        id: newuser.id,
        name: newuser.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mssg: "Internal server error" });
  }
};

export const getCurrentUser: RequestHandler = (req, res) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  res.status(200).json({ user });
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Check whether the user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      res.status(403).json({ mssg: "user does not exist" });
      return;
    }

    // Compare the password
    const ispasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!ispasswordValid) {
      res.status(401).json({ mssg: "invalid password" });
      return;
    }

    generateToken(existingUser.id, res);

    res.status(200).json({
      mssg: "logged in successfully",
      user: {
        id: existingUser.id,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mssg: "internal server error" });
  }
};

export const logout: RequestHandler = (req, res): void => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mssg: "internal server issue" });
  }
};
