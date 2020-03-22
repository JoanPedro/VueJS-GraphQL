const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    # Pontos de Entrada da API
    scalar Date

    type Atributo {
        forca: Float!
        agilidade: Float!
        inteligencia: Float!
        vitalidade: Float!
    }

    type Personagem {
        id: ID!
        nome: String!
        classe: String!
        atributos: Atributo!
        master: Boolean
    }

    type Query {
        ola: String!
        horaAtual: String!
        formaScalar: Date!
        criarPersonagem: Personagem
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
        },
        criarPersonagem(){
            return {
                id: 1,
                nome: 'Lancelote',
                classe: 'Ferreiro',
                atributos: {
                    forca: 15,
                    agilidade: 9,
                    inteligencia: 4,
                    vitalidade: 10
                },
                master: true                
            }
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