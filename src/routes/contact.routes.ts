import { FastifyInstance } from "fastify";
import { Contact, ContactCreate } from "../util/interfaces/contact.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ContactUseCase } from "../useCases/contact.useCase";

export async function contactsRoutes(app:FastifyInstance){
    const contactUseCase = new ContactUseCase()

    app.addHook("preHandler",authMiddleware)

    app.post<{Body:ContactCreate}>("/", async (req,reply) =>{

        const {email,name,phone} = req.body
        const emailUser = req.headers["email"]

        try {

           const data = await contactUseCase.create({email,name,phone,userEmail:emailUser})

          return reply.send(data).status(201)

        } catch (error) {
            reply.status(500).send({message: error})
        }
    })

    app.get("/" , async (req,reply) =>{ 
        const emailUser = req.headers["email"]
        try {
            const data = await contactUseCase.listAllContacts(emailUser)

            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }

    })

    app.put<{Body:ContactCreate, Params:{id:string}}>("/:id" , async(req,reply) =>{

        const {id} = req.params 
        const {phone,email,name} = req.body
        try {
            const data = await contactUseCase.updateContact({
                id,email,name,phone
            })
            return reply.send(data)
        } catch (error) {
            
        }
    })

    app.delete<{Params:{id:string}}>("/:id", async(req,reply) =>{
        const {id} = req.params
        try {
            const data = await contactUseCase.delete(id)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}