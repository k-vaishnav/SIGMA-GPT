import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
const signUp = async (req, res) => {
  const { name, password, email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, password: hashedPassword, email });
  const result = await newUser.save();
  const payload = { userId: result._id, name: result.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const user = await User.findById(result._id).select("-password");
  return res.status(200).json({ message: "User registered successfully", user,token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({email});
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if(!isMatched) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const payload = { userId: user._id, name: user.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const ruser = await User.findById(user._id).select("-password");
  return res.status(200).json({ message: "Login successful", user:ruser,token});
};

export { signUp, login };
