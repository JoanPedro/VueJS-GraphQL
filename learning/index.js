const { ApolloServer, gql } = require('apollo-server') // Servidor do Apollo

const typeDefs = gql`
    # Pontos de Entrada da API
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
    
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
        produtoEmDestaque: Produto
        numerosEmArray: [Int!]!
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            valorDesconto = produto.preco * (1 - produto.desconto)
            produto.precoComDesconto = (valorDesconto)
            
            return produto.precoComDesconto
        }
    },

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
        },
        produtoEmDestaque() {
            return {
                nome: 'Alcool em Gel',
                preco: 18.59,
                desconto: 0.15,
            }
        },
        numerosEmArray() {
            // return [1, 2, 3 ,4]
            const ordenado = (a, b) => a - b
            return Array(10).fill(0)
                    .map(numberal => parseInt(Math.random() * 61))
                    .sort(ordenado)
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
