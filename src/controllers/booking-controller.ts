import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import BookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const response = await BookingService.get(userId);
    return res.send(response);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error.message);
    }
  }
  
  return res.send(req.userId);
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { roomId } = req.body;
  
  try {
    const response = await BookingService.post(userId, roomId);
    return res.send({ bookingId: response.id });
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.status(403).send(error.message);
    } else {
      return res.status(404).send(error.message);
    }
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { roomId } = req.body;
  const bookingId = Number(req.params.bookingId);

  try {
    const response = await BookingService.put(userId, roomId, bookingId);
    return res.send(response);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(404).send(error.message);
    else if (error.name === "ForbiddenError") return res.status(403).send(error.message);
    return res.sendStatus(500);
  }
}
