const {gql} = require('apollo-server-express')
const typeDefs = gql`
    type User 
    {
        id: ID!
        name: String!
        email: String!
        
    }
    type returnObject
    {
        data: User
        message: String
    }

    type Query 
    {
        getAllUsers: [User]
    }

    input UserInput
    {
        name: String
        email: String
    }

    type Mutation 
    {
        registerUser(user: UserInput): returnObject
        deleteUser(id:ID) : String
    }
`
module.exports = typeDefs;