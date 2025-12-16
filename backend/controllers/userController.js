import User from "../models/User.js";
import bcrypt from "bcryptjs";

// R: Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// C: Create User
export const createUser = async (req, res) => {
  const { name, email, password, role, department, universityID, address } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      role,
      department,
      universityID,
      address,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// U: Update User
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });

    res.json({ msg: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// D: Delete User
export const deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    await foundUser.deleteOne();

    res.json({ msg: "User successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
