import {Database} from 'sqlite3';
import {Owner} from './Owner';
import {Pet} from './Pet';

export class DatabaseQuery {

    private db: Database;

    public constructor() {
        const petsDb: string = `${__dirname}/../databases/pets.db`;

        this.db = new Database(petsDb);
    }

    public addOwner(owner: Owner): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run('INSERT INTO owner VALUES(?, ?, ?, ?, ?)', [null, owner.name, owner.address, owner.phone, owner.email], (err) => {
                    if (err) {
                        console.log(err);

                        return resolve(false);
                    }

                    return resolve(true);
                });
            });
        });
    }

    public getOwner(email: string): Promise<Owner | null> {
        return new Promise<Owner | null>((resolve, reject) => {
            this.db.serialize(() => {
                this.db.get(`SELECT * FROM owner WHERE email="${email}"`, (err, row) => {

                    if (err) {
                        console.log(err);

                        return reject(err);
                    }

                    if (row) {
                        const owner: Owner = {
                            id: row.id,
                            name: row.name,
                            address: row.address,
                            phone: row.phone,
                            email: row.email
                        };

                        return resolve(owner);
                    }

                    return resolve(null);
                });
            });
        });
    }

    public listOwners(): Promise<Owner[]>  {
        return new Promise<Owner[]>((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all('SELECT * FROM owner', (err, rows) => {

                    if (err) {
                        console.log(err);

                        return reject(err);
                    }

                    const owners: Owner[] = [];
                    if (rows && rows.length) {
                        
                        for (let row of rows) {
                            owners.push({
                                id: row.id,
                                name: row.name,
                                address: row.address,
                                phone: row.phone,
                                email: row.email
                            });
                        }
                    }

                    return resolve(owners);
                });
            });
        });
    }

    public listPetsByOwner(email: string): Promise<Pet[]> {
        return new Promise<Pet[]>((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(`SELECT pet.id, pet.ownerid,
                                    pet.name,
                                    pet.age,
                                    pet.colour,
                                    pet.breed FROM pet
                            INNER JOIN owner
                            ON pet.ownerid=owner.id
                            WHERE owner.email="${email}"`, (err, rows) => {

                    if (err) {
                        return reject(err);
                    }

                    const pets: Pet[] = [];
                    if (rows && rows.length) {

                        for (let row of rows) {
                            pets.push({
                               id: row.id,
                               ownerid: row.ownerid,
                               name: row.name,
                               colour: row.colour,
                               age: row.age,
                               breed: row.breed 
                            });
                        }
                    }

                    return resolve(pets);
                });
            });
        });
    }

    public addPet(ownerid: number, pet: Pet): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run('INSERT INTO pet VALUES(?, ?, ?, ?, ?, ?)', [null, ownerid, pet.name, pet.colour, pet.age, pet.breed], (err) => {
                    if (err) {
                        console.log(err);

                        return reject(err);
                    }

                    return resolve(true);
                });
            });
        });
    }

    public editPet(ownerid: number, pet: Pet): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.serialize(() => {

                const updateQuery: string = `UPDATE pet SET 
                                            ${pet.name ? 'name=$name' : ''} 
                                            ${pet.colour ? 'colour=$colour' : ''} 
                                            ${pet.age ? 'age=$age' : ''} 
                                            ${pet.breed ? 'breed=$breed' : ''} 
                                            WHERE id=$id AND ownerid=$ownerid`;

                const updateQueryValues: any = {};
                if (pet.name) updateQueryValues.$name = pet.name;
                if (pet.colour) updateQueryValues.$colour = pet.colour;
                if (pet.age) updateQueryValues.$age = pet.age;
                if (pet.breed) updateQueryValues.$breed = pet.breed;
                updateQueryValues.$id = pet.id;
                updateQueryValues.$ownerid = ownerid;

                this.db.run(updateQuery, updateQueryValues, (err) => {
                    if (err) {
                        console.log(err);

                        return reject(err);
                    }

                    return resolve(true);
                });
            });
        });
    }
}