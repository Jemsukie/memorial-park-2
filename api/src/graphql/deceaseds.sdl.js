export const schema = gql`
  type Deceased {
    id: Int!
    firstName: String!
    lastName: String!
    dateBorn: DateTime!
    dateDied: DateTime!
    latitude: String!
    longitude: String!
    status: String!
    createdAt: DateTime!
    users: [DeceasedOfUser]!
  }

  type Query {
    deceaseds: [Deceased!]! @skipAuth
    deceased(id: Int!): Deceased @skipAuth
  }

  input CreateDeceasedInput {
    firstName: String!
    lastName: String!
    dateBorn: DateTime!
    dateDied: DateTime!
    latitude: String!
    longitude: String!
    status: String!
  }

  input UpdateDeceasedInput {
    firstName: String
    lastName: String
    dateBorn: DateTime
    dateDied: DateTime
    latitude: String
    longitude: String
    status: String
  }

  type Mutation {
    createDeceased(input: CreateDeceasedInput!): Deceased! @skipAuth
    updateDeceased(id: Int!, input: UpdateDeceasedInput!): Deceased! @skipAuth
    deleteDeceased(id: Int!): Deceased! @skipAuth
  }
`
