import express from "express";
import { z } from "zod";
import { fibonacci, filterPrimes, gcdMultiple, lcmMultiple } from "../utils/math.js";
import { askAI } from "../utils/ai.js";

const router = express.Router();

const OFFICIAL_EMAIL = "sudhanshu4818.be23@chitkara.edu.in";

const bfhlSchema = z.object({
  body: z.record(z.unknown()).refine(
    (val) => {
      const keys = Object.keys(val);
      return keys.length === 1 && ["fibonacci", "prime", "lcm", "hcf", "AI"].includes(keys[0]);
    },
    { message: "Exactly one key allowed: fibonacci | prime | lcm | hcf | AI" }
  )
});

router.post("/bfhl", async (req, res, next) => {
  try {
    const parsed = bfhlSchema.parse({ body: req.body });
    const key = Object.keys(req.body)[0];
    const value = req.body[key];

    let data;

    switch (key) {
      case "fibonacci":
        const n = z.number().int().positive().parse(value);
        data = fibonacci(n);
        break;

      case "prime":
        const arrP = z.array(z.number().int()).parse(value);
        data = filterPrimes(arrP);
        break;

      case "lcm":
        const arrL = z.array(z.number().int().positive()).min(1).parse(value);
        data = lcmMultiple(arrL);
        break;

      case "hcf":
        const arrH = z.array(z.number().int().nonnegative()).min(1).parse(value);
        data = gcdMultiple(arrH);
        break;

      case "AI":
        const q = z.string().min(3).parse(value);
        data = await askAI(q);
        break;

      default:
        throw new Error("Invalid operation");
    }

    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        is_success: false,
        message: err.errors[0].message,
        error: "Validation failed"
      });
    }

    next(err); // send to error handler
  }
});

export default router;