import { FastifyInstance } from "fastify";
import { UserRepositoryPrisma} from "../useCases/user.useCase";
import { UserCreate } from "../util/interfaces/user.interface";


export async function userRoutes(app:FastifyInstance){
    const userUseCase = new UserRepositoryPrisma()
    
    app.post<{Body:UserCreate}>("/", async (req,reply) =>{

        const {email,name} = req.body

        try {
          const data = await userUseCase.create({email,name}) 

          return reply.send(data)
        } catch (error) {
            reply.status(500).send({message: error})
        }
    })

    app.get("/",(req,reply) =>{

        return reply.send({hello:"world"})
    })
}