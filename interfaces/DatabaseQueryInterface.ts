import {Owner} from '../models/Owner';
import {Pet} from '../models/Pet';

export interface DatabaseQueryInterface {
    addOwner(owner: Owner): Promise<boolean>;
    getOwner(email: string): Promise<Owner | null>;
    listOwners(): Promise<Owner[]>;
    listPetsByOwner(email: string): Promise<Pet[]>;
    addPet(ownerid: number, pet: Pet): Promise<boolean>;
    editPet(ownerid: number, pet: Pet): Promise<boolean>;
}