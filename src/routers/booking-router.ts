import { authenticateToken } from "@/middlewares";
import express from "express";
import { getBooking, postBooking, putBooking } from "@/controllers";

const bookingRouter = express.Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", postBooking)
  .put("/", putBooking);

export default bookingRouter;
