import { db } from 'src/lib/db'

export const users = async () => {
  return await db.user.findMany()
}

export const usersByRole = async ({ roles }) => {
  return await db.user.findMany({
    where: { roles },
  })
}

export const usersByRoleCount = async ({ roles }) => {
  return await db.user.count({
    where: { roles },
  })
}

export const user = async ({ id }) => {
  return await db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  deceaseds: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).deceaseds(),
}
