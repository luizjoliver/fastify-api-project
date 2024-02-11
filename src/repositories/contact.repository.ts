import { prisma } from "../database/prisma";
import { Contact,  ContactCreateData, IContactRepository } from "../util/interfaces/contact.interface";

class ContactsRepositoryPrisma implements IContactRepository{


async create(data: ContactCreateData): Promise<Contact> {
    const result = await prisma.contacts.create({
        data:{
            email:data.email,
            name:data.name,
            phone:data.phone,
            usersId:data.userId
        }
    })

    return result
}

async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
    
    const result = await prisma.contacts.findFirst({
        where:{
            OR:[
                {email:email},
                {phone:phone}
            ]
        }
    })

    return result || null
}
   async findAllContacts(userId: string): Promise<Contact[]> {
       const result = await prisma.contacts.findMany({
        where:{
            usersId:userId
        }
       })

       return result
   }

   async updateContact({ id, email, phone, name }: Contact): Promise<Contact> {
       const result = await prisma.contacts.update({

        where:{
            id
        },
        data:{
            email,
            phone,
            name
        }
       })

       return result
   }

   async delete(id: string): Promise<boolean> {
       const result = await prisma.contacts.delete({
        where:{
            id
        }
       })

       return result ? true : false
   }
   
}

export {ContactsRepositoryPrisma}