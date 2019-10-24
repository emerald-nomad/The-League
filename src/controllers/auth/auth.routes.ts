import { Router, Request, Response } from "express";
import { hash, compare } from "bcryptjs";

import { registerValidation, loginValidation } from "./auth.validation";
import { validationResult } from "express-validator";
import User from "../../models/User";

import { createSession, AuthUser } from "./auth.utils";

const router = Router();

// @route   GET /api/auth/register
// @desc    Register new user
// access   Public
router.post(
  "/register",
  registerValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json(errors.mapped());

    const { email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const data = { ...req.body, password: hashedPassword };

    try {
      const newUser = ((await User.create(data)) as any) as AuthUser;

      const token = await createSession({
        email,
        userId: newUser._id.toString()
      });

      const userData = { id: newUser._id, email: newUser.email };

      return res.status(200).json({ token, user: userData });
    } catch (error) {
      console.error(error);

      return res
        .status(400)
        .send("Error encountered while trying to create new user");
    }
  }
);

// @route   GET /api/auth/login
// @desc    Login user
// access   Public
router.post("/login", loginValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors.mapped());

  const { email, password } = req.body;

  const user = ((await User.findOne({ email })) as any) as AuthUser;

  if (!user) {
    return res
      .status(400)
      .json({ password: "Incorrect email/password combination" });
  }

  const valid = await compare(password, user.password);

  if (!valid) {
    return res
      .status(400)
      .json({ password: "Incorrect email/password combination" });
  }

  try {
    const token = await createSession({
      email,
      userId: user._id.toString()
    });

    const userData = { id: user._id, email: user.email };

    return res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error(error);

    res.status(400).send("Error encountered while trying to login user");
  }
});
export default router;
