import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import {UserType} from '../TypeDefs/User'
import {Users} from '../../Entities/Usert'
import { MessageType } from '../TypeDefs/Messages';


export const CREATE_USER ={
    type: UserType,
    args:{
        name:{type: GraphQLString},
        username:{type: GraphQLString},
        password:{type: GraphQLString},
    },
    async resolve(parent: any, args:any){
        const {name, username, password} =args;
        await Users.insert(args);
        console.log(args)
        return args
    }
}

export const UPDATE_PASSWORD ={
    type: MessageType,
    args:{
        username:{type: GraphQLString},
        oldPassword: {type: GraphQLString},
        newPassword:{type: GraphQLString},
    },
    async resolve(parent: any, args:any){
        const {username,oldPassword, newPassword } =args;
        const user = await Users.findOne({ where: { username: username } });

        if(!user){
            throw new Error("USERNAME DOESNO'T EXIST")
        }

        const userPassword = user?.password

        if(oldPassword == userPassword){
            await Users.update({username: username}, {password: newPassword})

            return {successfull:true , message: "Password update"}
        }else{
            throw new Error("Password do not match")
        } 
    }
}
export const DELETE_USER = {
    type: MessageType, 
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
        const id = args.id;

        
        const userToDelete = await Users.findOne({ where: { id } });
        if (!userToDelete) {
            throw new Error("Usuário não encontrado");
        }

        
        await Users.delete(id);

       
        return {
            success: true,
            message: "Usuário deletado com sucesso",
            id: id, 
        };
    },
};
