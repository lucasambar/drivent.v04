import BookingRepository from "@/repositories/booking repository";
import error from "./error";

async function get(userId: number) {
  return userId;
}

async function validateTicket(userId: number) {
  const ticket = await BookingRepository.findTicketByUserId(userId);

  if (!ticket) throw error.ForbiddenError("Ticket not found");
  if (ticket.status === "RESERVED") throw error.ForbiddenError("Ticket not paid yet");
  if (ticket.TicketType.isRemote) throw error.ForbiddenError("Ticket is remote");
  if (!ticket.TicketType.includesHotel) throw error.ForbiddenError("Ticket dosen't includes hotel");

  return ticket;
}

async function validateRoom(roomId: number) {
  const room = await BookingRepository.findRoomById(roomId);

  if (!room) throw error.NotFoundError("Room not found");
  if (room.capacity === room.Booking.length) throw error.ForbiddenError("Room already full");

  return room;
}

async function post(userId: number, roomId: number) {
  await validateTicket(userId);
  await validateRoom(roomId);

  const booking = BookingRepository.insert({ userId, roomId });

  return booking;
}

const BookingService = {
  get,
  post
};

export default BookingService;
