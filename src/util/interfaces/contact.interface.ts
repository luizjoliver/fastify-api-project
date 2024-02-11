export interface Contact {
    id:string,
    name:string,
    email:string,
    phone:string,
    userId?:string
}

export interface ContactCreate {
    name:string,
    email:string,
    phone:string,
    userEmail:string
}

export interface ContactCreateData{
    name:string,
    email:string,
    phone:string,
    userId:string
}
export interface IContactRepository{
    create(data:ContactCreateData) : Promise<Contact>
    findByEmailOrPhone(email:string , phone:string) : Promise<Contact | null>
    findAllContacts(userId:string) : Promise<Contact[]>
    updateContact({id,email,phone,name}:Contact) : Promise<Contact>
    delete(id:string) : Promise<boolean>
}