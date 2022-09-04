export const schema = gql`
  type DeceasedOfUser {
    id: Int!
    userId: Int!
    user: User!
    deceasedId: Int!
    deceased: Deceased!
    createdAt: DateTime!
  }

  type Query {
    deceasedOfUsers: [DeceasedOfUser!]! @skipAuth
    deceasedOfUser(id: Int!): DeceasedOfUser @skipAuth
    deceasedOfUsersByUser(userId: Int!): [DeceasedOfUser!]! @skipAuth
    deceasedOfUsersByDeceased(deceasedId: Int!): [DeceasedOfUser!]! @skipAuth
  }

  input CreateDeceasedOfUserInput {
    userId: Int!
    deceasedId: Int!
  }

  input UpdateDeceasedOfUserInput {
    userId: Int
    deceasedId: Int
  }

  type Mutation {
    createDeceasedOfUser(input: CreateDeceasedOfUserInput!): DeceasedOfUser!
      @skipAuth
    updateDeceasedOfUser(
      id: Int!
      input: UpdateDeceasedOfUserInput!
    ): DeceasedOfUser! @skipAuth
    deleteDeceasedOfUser(id: Int!): DeceasedOfUser! @skipAuth
  }
`
