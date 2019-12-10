const { buildSchema }=require('graphql');

module.exports=buildSchema(`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
    }

    input UserInput {
        firstName:String!
        lastName:String!
        username:String!
        email:String!
        password:String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        user:[User!]!
        login(username:String!, email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);