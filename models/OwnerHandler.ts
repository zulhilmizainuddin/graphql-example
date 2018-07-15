import {inject, injectable} from 'inversify';

import {Pet} from "./Pet";
import {Owner} from "./Owner";
import {DatabaseQueryInterface} from "../interfaces/DatabaseQueryInterface";

@injectable()
export class OwnerHandler {
    public constructor(@inject('SqliteQuery') private databaseQuery: DatabaseQueryInterface) {}

    public async addOwner(owner: Owner): Promise<boolean> {
        const result: boolean = await this.databaseQuery.addOwner(owner);

        return result;
    }

    public async listOwners(): Promise<Owner[]> {
        const owners: Owner[] = await this.databaseQuery.listOwners();

        return owners;
    }

    public async getOwner(email: string): Promise<Owner | null> {
        const owner: Owner | null = await this.databaseQuery.getOwner(email);

        if (owner) {
            const pets: Pet[] = await this.databaseQuery.listPetsByOwner(email);

            if (pets && pets.length) {
                owner.pets = pets;
            }

            return owner;
        }

        return null;
    }
}