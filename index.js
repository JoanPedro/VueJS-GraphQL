const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    # Pontos de Entrada da API
    scalar Date

    type Query {
        ola: String
        horaAtual: String
        formaScalar: Date
    }
`

const resolvers = {
    Query: {
        ola() {           
            return 'Saudação'
        },
        horaAtual () {
            now = new Date
            return now.toString()        // Para retornar a forma String do Objeto. 
                                        //  Se não seria o formato int NTP.
            /* return `${new Date}` */
        },
        formaScalar() {
            return new Date()
        }
    }
}

const server = new ApolloServer({
    typeDefs, 
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`A executar em ${url}`)
})