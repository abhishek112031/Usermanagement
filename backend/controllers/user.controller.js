const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// User Registration
exports.registration = async (req, res, next) => {
  const { name, password, email, phone, profession } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email });
    const existingUserPhone = await User.findOne({ phone });
    if (existingUserEmail) {
      return res.status(400).json({ message: "User Email already exists" });
    }
    if (existingUserPhone) {
      return res
        .status(400)
        .json({ message: "User Phone Number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      phone,
      profession,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// User Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email " });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await generateToken(user.email);

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const id=req.params.id
    const user = await User.findOne({_id:id});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, profession } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    // if (password) user.password = await bcrypt.hash(password, 12);
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (profession) user.profession = profession;

    await user.save();

    res.status(200).json({ message: "User updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
