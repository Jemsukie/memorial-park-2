export const schema = gql`
  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    roles: String!
    deceaseds: [DeceasedOfUser]!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
    usersByRole(roles: String!): [User!]! @skipAuth
    usersByRoleCount(roles: String!): Int! @skipAuth
  }

  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth
  }
`
