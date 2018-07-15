import {Container} from 'inversify';

import {DatabaseQueryInterface} from '../interfaces/DatabaseQueryInterface';

import {SqliteQuery} from '../models/SqliteQuery';
import {OwnerHandler} from '../models/OwnerHandler';
import {PetHandler} from '../models/PetHandler';

const container: Container = new Container();
container.bind<DatabaseQueryInterface>('SqliteQuery').to(SqliteQuery);
container.bind<OwnerHandler>('OwnerHandler').to(OwnerHandler);
container.bind<PetHandler>('PetHandler').to(PetHandler);

export {container}