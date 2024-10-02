import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'
dotenv.config()

const connectNeo4j = () => {
  const URI = process.env.NEO4J_URI
  const USER = process.env.NEO4J_USERNAME
  const PASSWORD = process.env.NEO4J_PASSWORD

  if (URI === undefined || USER === undefined || PASSWORD === undefined) {
    throw new Error('Neo4J configuration not found')
  }

  const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
  // const session = driver.session()
  console.log('Connected to Neo4j')

  return driver
}

const driver = connectNeo4j()

export { driver }

export default connectNeo4j