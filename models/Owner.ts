import {Pet} from "./Pet";

export interface Owner {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    pets?: Pet[];
}