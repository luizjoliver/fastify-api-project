import {ContactsRepositoryPrisma} from "../repositories/contact.repository"
import { Contact, ContactCreate } from "../util/interfaces/contact.interface";
import { UserRepositoryPrisma } from "./user.useCase";
  
  class ContactUseCase {
    private contactRepository: ContactsRepositoryPrisma;
    private userRepository: UserRepositoryPrisma;
    constructor() {
      this.contactRepository = new ContactsRepositoryPrisma();
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async create({ email, name, phone, userEmail }: ContactCreate) {
      //email do usuario logado
      //buscar o usuario pelo email
      //se nao existir, retornar erro
      //se existir, criar o contato
      //antes de criar o contato, validar se ele ja existe pelo telefone ou email
  
      const user = await this.userRepository.findByEmail(userEmail);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const verifyIfExistsContact =
        await this.contactRepository.findByEmailOrPhone(email, phone);
  
      if (verifyIfExistsContact) {
        throw new Error('Contact already exists');
      }
  
      const contact = await this.contactRepository.create({
        email,
        name,
        phone,
        userId: user.id,
      });
  
      return contact;
    }
    async listAllContacts(userEmail: string) {
      const user = await this.userRepository.findByEmail(userEmail);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const contacts = await this.contactRepository.findAllContacts(user.id);
  
      return contacts;
    }
    
  async updateContact  ({id,email,phone,name}:Contact){
    const data = await this.contactRepository.updateContact({id,email,phone,name})

    return data

  }
  async delete (id:string){
      const data = await this.contactRepository.delete(id)

      return data
  }
    
  }
  
  export { ContactUseCase };