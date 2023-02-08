import BookingRepository from "@/repositories/booking repository";
import error from "./error";

async function findBookings(userId: number) {
  const booking = await BookingRepository.findBookingByUserId(userId);

  if(!booking) throw error.NotFoundError("There is no booking for this user");

  return {
    bookingId: booking.id,
    room: booking.Room
  };
}

async function get(userId: number) {
  const booking = await findBookings(userId);
  return booking;
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

async function validateBooking(bookingId: number, userId: number) {
  const booking = await BookingRepository.findBookingById(bookingId);

  if (!booking) throw error.NotFoundError("Booking not found!");
  if (booking.userId !== userId) throw error.ForbiddenError("User dosen't own this booking.");

  return;
}

async function put(userId: number, roomId: number, bookingId: number) {
  await validateBooking(bookingId, userId);
  await validateTicket(userId);
  await validateRoom(roomId);

  await BookingRepository.deleteBooking(bookingId);
  const booking = await BookingRepository.insert({ userId, roomId });

  return { bookingId: booking.id };
}

const BookingService = {
  get,
  post, 
  put
};

export default BookingService;
