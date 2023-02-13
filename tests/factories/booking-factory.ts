import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: { userId, roomId }
  });
}

export async function createRandomBooking(userId: number) {
  return prisma.booking.create({
    data: { 
      userId,
      roomId: faker.datatype.number()
    }
  });
}
