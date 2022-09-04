import { db } from 'src/lib/db'

export const deceasedOfUsers = async () => {
  return await db.deceasedOfUser.findMany()
}

export const deceasedOfUsersByUser = async ({ userId }) => {
  console.log('--userId', userId)
  return await db.deceasedOfUser.findMany({
    where: {
      userId,
    },
  })
}

export const deceasedOfUsersByDeceased = async ({ deceasedId }) => {
  return await db.deceasedOfUser.findMany({
    where: {
      deceasedId,
    },
  })
}

export const deceasedOfUser = async ({ id }) => {
  return await db.deceasedOfUser.findUnique({
    where: { id },
  })
}

export const createDeceasedOfUser = ({ input }) => {
  return db.deceasedOfUser.create({
    data: input,
  })
}

export const updateDeceasedOfUser = ({ id, input }) => {
  return db.deceasedOfUser.update({
    data: input,
    where: { id },
  })
}

export const deleteDeceasedOfUser = ({ id }) => {
  return db.deceasedOfUser.delete({
    where: { id },
  })
}

export const DeceasedOfUser = {
  user: (_obj, { root }) =>
    db.deceasedOfUser.findUnique({ where: { id: root.id } }).user(),
  deceased: (_obj, { root }) =>
    db.deceasedOfUser.findUnique({ where: { id: root.id } }).deceased(),
}
