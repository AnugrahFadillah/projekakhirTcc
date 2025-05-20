import User from '../model/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register user baru
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // cek apakah email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ msg: "Email sudah terdaftar" });

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // simpan user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login user dan generate token
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    // Buat token akses dan refresh token
    const userPlain = user.toJSON();
    const { password: _, refresh_token: __, ...safeUserData } = userPlain;

    const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // simpan refresh token di db
    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    // kirim refresh token di cookie dan access token di body response
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
