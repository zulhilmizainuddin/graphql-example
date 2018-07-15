import {container} from '../inversify/inversify.config';

import {Owner} from "../models/Owner";
import {Pet} from "../models/Pet";
import {OwnerHandler} from "../models/OwnerHandler";
import {PetHandler} from "../models/PetHandler";
import {SqliteQuery} from "../models/SqliteQuery";

const collectiveResolver: any = {
    Query: {
        owners: async (root: any, args: any, context: any): Promise<Owner[]> => {

            const ownerHandler: OwnerHandler = container.get<OwnerHandler>('OwnerHandler');
            const owners: Owner[] = await ownerHandler.listOwners();

            return owners;
        },
        pets: async (root: any, args: any, context: any): Promise<Pet[]> => {
            const email: string = args.email;

            const petHandler: PetHandler = container.get<PetHandler>('PetHandler');
            const pets: Pet[] = await petHandler.listPetsByOwner(email);

            return pets;
        },
        owner: async (root: any, args: any, context: any): Promise<Owner | null> => {
            const email: string = args.email;

            const ownerHandler: OwnerHandler = container.get<OwnerHandler>('OwnerHandler');
            const owner: Owner | null = await ownerHandler.getOwner(email);
            
            return owner;
        }
    },
    Mutation: {
        addOwner: async (root: any, args: any, context: any): Promise<boolean> => {
            const owner: Owner = {
                name: args.name,
                address: args.address,
                phone: args.phone,
                email: args.email
            };

            const ownerHandler: OwnerHandler = container.get<OwnerHandler>('OwnerHandler');
            const result: boolean = await ownerHandler.addOwner(owner);

            return result;
        },
        addPet: async (root: any, args: any, context: any): Promise<boolean> => {
            const email: string = args.email;

            const pet: Pet = {
                name: args.name,
                colour: args.colour,
                age: args.age,
                breed: args.breed
            };

            const petHandler: PetHandler = container.get<PetHandler>('PetHandler');
            const result: boolean = await petHandler.addPet(email, pet);

            return result;
        },
        editPet: async (root: any, args: any, context: any): Promise<boolean> => {
            const email: string = args.email;

            const pet: Pet = {
                id: args.id,
                name: args.name,
                colour: args.colour,
                age: args.age,
                breed: args.breed
            };

            const petHandler: PetHandler = container.get<PetHandler>('PetHandler');
            const result: boolean = await petHandler.editPet(email, pet);

            return result;
        }
    }
}

export {collectiveResolver};