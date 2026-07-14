import { PrismaClient } from '@prisma/client'
import { connect } from '@tidbcloud/serverless'
import { PrismaTiDB } from '@tidbcloud/prisma-adapter'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }
  const connection = connect({ url: connectionString })
  const adapter = new PrismaTiDB(connection)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
