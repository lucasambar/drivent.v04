import { authenticateToken, validateBody } from "@/middlewares";
import express from "express";
import { getBooking, postBooking, putBooking } from "@/controllers";
import bookingSchema from "@/schemas/booking-schema";

const bookingRouter = express.Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(bookingSchema), postBooking)
  .put("/:bookingId", validateBody(bookingSchema), putBooking);

export { bookingRouter };
