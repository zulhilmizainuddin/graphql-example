import {Owner} from "../models/Owner";
import {Pet} from "../models/Pet";
import {SqliteQuery} from "../models/SqliteQuery";

const collectiveResolver: any = {
    Query: {
        owners: async (root: any, args: any, context: any): Promise<Owner[]> => {
            const databaseQuery = new SqliteQuery();
            const owners: Owner[] = await databaseQuery.listOwners();

            return owners;
        },
        pets: async (root: any, args: any, context: any): Promise<Pet[]> => {
            const email: string = args.email;

            const databaseQuery = new SqliteQuery();
            const pets: Pet[] = await databaseQuery.listPetsByOwner(email);

            return pets;
        },
        owner: async (root: any, args: any, context: any): Promise<Owner | null> => {
            const email: string = args.email;

            const databaseQuery = new SqliteQuery();
            const owner: Owner | null = await databaseQuery.getOwner(email);
            if (owner) {
                const pets: Pet[] = await databaseQuery.listPetsByOwner(email);

                if (pets && pets.length) {
                    owner.pets = pets;
                }

                return owner;
            }

            return null;
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

            const databaseQuery = new SqliteQuery();
            const result: boolean = await databaseQuery.addOwner(owner);

            return result;
        },
        addPet: async (root: any, args: any, context: any): Promise<boolean> => {
            const email: string = args.email;

            const databaseQuery = new SqliteQuery();
            const owner: Owner | null = await databaseQuery.getOwner(email);

            let result: boolean = false;
            if (owner) {

                const pet: Pet = {
                    name: args.name,
                    colour: args.colour,
                    age: args.age,
                    breed: args.breed
                };

                result = await databaseQuery.addPet(owner.id as number, pet);
            }

            return result;
        },
        editPet: async (root: any, args: any, context: any): Promise<boolean> => {
            const email: string = args.email;

            const databaseQuery = new SqliteQuery();
            const owner: Owner | null = await databaseQuery.getOwner(email);

            let result: boolean = false;
            if (owner) {

                const pet: Pet = {
                    id: args.id,
                    name: args.name,
                    colour: args.colour,
                    age: args.age,
                    breed: args.breed
                };

                result = await databaseQuery.editPet(owner.id as number, pet);
            }

            return result;
        }
    }
}

export {collectiveResolver};