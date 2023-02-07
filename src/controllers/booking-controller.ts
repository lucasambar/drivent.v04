import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  return res.send(req.userId);
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  return res.send(req.userId);
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  return res.send(req.userId);  
}
