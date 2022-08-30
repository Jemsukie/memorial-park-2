import {
  deceaseds,
  deceased,
  createDeceased,
  updateDeceased,
  deleteDeceased,
} from './deceaseds'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('deceaseds', () => {
  scenario('returns all deceaseds', async (scenario) => {
    const result = await deceaseds()

    expect(result.length).toEqual(Object.keys(scenario.deceased).length)
  })

  scenario('returns a single deceased', async (scenario) => {
    const result = await deceased({ id: scenario.deceased.one.id })

    expect(result).toEqual(scenario.deceased.one)
  })

  scenario('creates a deceased', async () => {
    const result = await createDeceased({
      input: {
        firstName: 'String',
        lastName: 'String',
        dateBorn: '2022-08-30T13:50:41Z',
        dateDied: '2022-08-30T13:50:41Z',
      },
    })

    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.dateBorn).toEqual('2022-08-30T13:50:41Z')
    expect(result.dateDied).toEqual('2022-08-30T13:50:41Z')
  })

  scenario('updates a deceased', async (scenario) => {
    const original = await deceased({ id: scenario.deceased.one.id })
    const result = await updateDeceased({
      id: original.id,
      input: { firstName: 'String2' },
    })

    expect(result.firstName).toEqual('String2')
  })

  scenario('deletes a deceased', async (scenario) => {
    const original = await deleteDeceased({ id: scenario.deceased.one.id })
    const result = await deceased({ id: original.id })

    expect(result).toEqual(null)
  })
})
