const {ApoloServer, graphQL} = require('apollo-server')

const typeDefs = graphQL`

`

const resolvers = {}

const server = new ApoloServer ({
    typeDefs, 
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`A executar em ${url}`)
})