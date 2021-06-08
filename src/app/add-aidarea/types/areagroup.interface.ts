import { IArea } from "./area.interface";

export interface IAreaGroup{

    id: any;
    name: string;
    country?: string;
    state?: string;
    city?: string;
    areas?: IArea[];

    

}