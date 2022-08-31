import { db } from 'src/lib/db'

export const deceaseds = async () => {
  return await db.deceased.findMany()
}

export const deceasedByStatusCount = async ({ status }) => {
  return await db.deceased.count({
    where: { status },
  })
}

export const deceased = async ({ id }) => {
  return await db.deceased.findUnique({
    where: { id },
  })
}

export const createDeceased = async ({ input }) => {
  return await db.deceased.create({
    data: input,
  })
}

export const updateDeceased = ({ id, input }) => {
  return db.deceased.update({
    data: input,
    where: { id },
  })
}

export const deleteDeceased = ({ id }) => {
  return db.deceased.delete({
    where: { id },
  })
}

export const Deceased = {
  users: (_obj, { root }) =>
    db.deceased.findUnique({ where: { id: root.id } }).users(),
}
