import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  global.prisma = global.prisma || new PrismaClient()
  prisma = global.prisma
}

export default prisma
