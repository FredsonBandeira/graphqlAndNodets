import "reflect-metadata"
import  express  from "express";
import { graphqlHTTP } from "express-graphql";
import cors from 'cors';
import { DataSource } from "typeorm";
import {schema} from  './schema'
import { Users } from "./Entities/Usert";
const main = async () =>{

    const  createConnection = new DataSource({
        type: "mysql",
        database: "graphql_db",
        password: "root",
        username: "root",
        port: 3306,
        logging: true,
        synchronize: false,
        entities: [Users]
    });
    createConnection.initialize()
        .then(()=>{
            console.log("Data Source has been initialized!")
        })
        .catch((err)=>{
            console.error("Error during Data Source initialization", err)
        })

    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql:true
    }))

    app.listen(3001, ()=>{
        console.log("Server running on port 3001")
    })
}

main().catch((err) =>{
    console.log(err)
})