import { prisma } from "@/config";

type BookingBody = {
  userId: number,
  roomId: number
};

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

const BookingRepository = {
  findTicketByUserId,
  findRoomById,
  insert
};

export default BookingRepository;
