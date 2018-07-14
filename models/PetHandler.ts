import {Pet} from "./Pet";
import {Owner} from "./Owner";
import {DatabaseQueryInterface} from "../interfaces/DatabaseQueryInterface";

export class PetHandler {
    public constructor(private databaseQuery: DatabaseQueryInterface) {}

    public async addPet(email: string, pet: Pet): Promise<boolean> {
        const owner: Owner | null = await this.databaseQuery.getOwner(email);

        let result: boolean = false;
        if (owner) {
            result = await this.databaseQuery.addPet(owner.id as number, pet);
        }

        return result;
    }

    public async editPet(email: string, pet: Pet): Promise<boolean> {
        const owner: Owner | null = await this.databaseQuery.getOwner(email);

        let result: boolean = false;
        if (owner) {
            result = await this.databaseQuery.editPet(owner.id as number, pet);
        }

        return result;
    }

    public async listPetsByOwner(email: string): Promise<Pet[]> {
        const pets: Pet[] = await this.databaseQuery.listPetsByOwner(email);

        return pets;
    }
}