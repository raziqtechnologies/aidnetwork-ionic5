import { UserVO } from "../models/uservo";
import { AreaVO } from "./area";

export class AreaGroupVO {


	private  id:number;

	private areagroup:number;

	private createdate:string;
    
    private pocs:UserVO[];

    private areas:AreaVO[];

}