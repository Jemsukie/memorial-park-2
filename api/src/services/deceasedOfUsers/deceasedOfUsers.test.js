import {
  deceasedOfUsers,
  deceasedOfUser,
  createDeceasedOfUser,
  updateDeceasedOfUser,
  deleteDeceasedOfUser,
} from './deceasedOfUsers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('deceasedOfUsers', () => {
  scenario('returns all deceasedOfUsers', async (scenario) => {
    const result = await deceasedOfUsers()

    expect(result.length).toEqual(Object.keys(scenario.deceasedOfUser).length)
  })

  scenario('returns a single deceasedOfUser', async (scenario) => {
    const result = await deceasedOfUser({
      id: scenario.deceasedOfUser.one.id,
    })

    expect(result).toEqual(scenario.deceasedOfUser.one)
  })

  scenario('creates a deceasedOfUser', async (scenario) => {
    const result = await createDeceasedOfUser({
      input: {
        userId: scenario.deceasedOfUser.two.userId,
        deceasedId: scenario.deceasedOfUser.two.deceasedId,
      },
    })

    expect(result.userId).toEqual(scenario.deceasedOfUser.two.userId)
    expect(result.deceasedId).toEqual(scenario.deceasedOfUser.two.deceasedId)
  })

  scenario('updates a deceasedOfUser', async (scenario) => {
    const original = await deceasedOfUser({
      id: scenario.deceasedOfUser.one.id,
    })

    const result = await updateDeceasedOfUser({
      id: original.id,
      input: { userId: scenario.deceasedOfUser.two.userId },
    })

    expect(result.userId).toEqual(scenario.deceasedOfUser.two.userId)
  })

  scenario('deletes a deceasedOfUser', async (scenario) => {
    const original = await deleteDeceasedOfUser({
      id: scenario.deceasedOfUser.one.id,
    })

    const result = await deceasedOfUser({ id: original.id })

    expect(result).toEqual(null)
  })
})
