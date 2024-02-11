import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactsRoutes } from "./routes/contact.routes";

const app:FastifyInstance = fastify({logger:true})


app.register(userRoutes,{
    prefix:"/users"
})
app.register(contactsRoutes,{
    prefix:"/contacts"
})


app.listen({port:3333},() => {
    console.log("Server is running at port 3333");
    
})







