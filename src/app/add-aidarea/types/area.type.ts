import { IArea } from "./area.interface";
import { IAreaGroup } from "./areagroup.interface";

export class Area implements IArea {
    id: any;
    name: string;
    areagroup : IAreaGroup;

    constructor(area: IArea) {
        this.id = area.id;
        this.name = area.name;
        this.areagroup = area.areagroup
      
      }

}
