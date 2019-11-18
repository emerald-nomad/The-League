import { checkSchema } from "express-validator";

export const dataValidation = checkSchema({
  password: {
    isLength: {
      errorMessage: "Password should be at least 8 chars long",
      // Multiple options would be expressed as an array
      options: { min: 8 }
    }
  }
});
