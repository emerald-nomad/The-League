import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import { privateRoute } from "../controllers.utils";

const router = Router();

// @route   POST /api/league/create
// @desc    Create new league
// access   Private
router.post("/create", privateRoute, async (req: Request, res: Response) => {
  return res.json({ create: "create a leage" });
});

export default router;
