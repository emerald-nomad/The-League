import { Router, Request, Response } from "express";

import { dataValidation } from "./test.validation";
import { check, validationResult } from "express-validator";

const router = Router();

// @route   GET /api/test/hello
// @desc    Test get route
// access   Public
router.get("/hello", async (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// @route   POST /api/test/data
// @desc    Test post route
// access   Public
router.post("/data", dataValidation, async (req: Request, res: Response) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors.mapped());

  res.status(200).json(req.body);
});

export default router;
