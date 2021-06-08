import { IAreaGroup } from "./areagroup.interface";
import { IArea } from "./area.interface";

export class AreaGroup implements IAreaGroup{

    id: any;
    name: string;
    country?: string;
    state?: string;
    city?: string;
    areas?: IArea[];


    constructor(areagroup: IAreaGroup)
    {
        this.id = areagroup.id;
        this.name = areagroup.name;
        this.country = areagroup.country;
        this.state = areagroup.state;
        this.city = areagroup.city;
        this.areas  = areagroup.areas;
    }


    
}