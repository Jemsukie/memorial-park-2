export const standard = defineScenario({
  deceasedOfUser: {
    one: {
      data: {
        user: {
          create: {
            email: 'String1592298',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            roles: 'String',
          },
        },

        deceased: {
          create: {
            firstName: 'String',
            lastName: 'String',
            dateBorn: '2022-08-30T13:50:53Z',
            dateDied: '2022-08-30T13:50:53Z',
          },
        },
      },
    },

    two: {
      data: {
        user: {
          create: {
            email: 'String9068237',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
            roles: 'String',
          },
        },

        deceased: {
          create: {
            firstName: 'String',
            lastName: 'String',
            dateBorn: '2022-08-30T13:50:53Z',
            dateDied: '2022-08-30T13:50:53Z',
          },
        },
      },
    },
  },
})
