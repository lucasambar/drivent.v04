import { prisma } from "@/config";

type BookingBody = {
  userId: number,
  roomId: number
};

function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true,
    }
  });
}

function findTicketByUserId(userId: number) {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true,
      Enrollment: {
        include: {
          User: true
        }
      },
    },
    where: {
      Enrollment: {
        userId: userId
      }
    }
  });
}

function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    include: {
      Booking: true,
    },
    where: {
      id: roomId
    }
  });
}

function insert(body: BookingBody) {
  return prisma.booking.create({
    data: body
  });
}

function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

function deleteBooking(bookingId: number) {
  return prisma.booking.delete({
    where: {
      id: bookingId
    }
  });
}

const BookingRepository = {
  findTicketByUserId,
  findRoomById,
  insert,
  findBookingByUserId,
  findBookingById,
  deleteBooking
};

export default BookingRepository;
