import { Router, Request, Response } from "express";
import { hash } from "bcryptjs";

import { registerValidation } from "./auth.validation";
import { validationResult } from "express-validator";
import User from "../../models/User";

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

    const hashedPassword = await hash(req.body.password, 10);

    const userData = { ...req.body, password: hashedPassword };

    try {
      const newUser = await User.create(userData);

      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);

      res.status(400).send("Error encountered while trying to create new use");
    }
  }
);

export default router;
