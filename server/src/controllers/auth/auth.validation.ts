import { checkSchema } from "express-validator";
import { Request } from "express-validator/src/base";

import User from "../../models/User";

export const registerValidation = checkSchema({
  email: {
    isEmail: true,
    normalizeEmail: true,
    custom: {
      options: async value => {
        const user = await User.findOne({ email: value });

        if (user) throw new Error("Email is already in use!");

        return true;
      }
    }
  },
  password: {
    escape: true,
    isLength: {
      options: {
        min: 8
      }
    },
    errorMessage: "Password must be at least 8 characters long"
  },
  confirmPassword: {
    escape: true,
    isLength: {
      options: {
        min: 8
      }
    },
    errorMessage: "Confirm password must be at least 8 characters long",
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }
    }
  }
});

export const loginValidation = checkSchema({
  email: {
    isEmail: true,
    normalizeEmail: true
  },
  password: {
    exists: true
  }
});
