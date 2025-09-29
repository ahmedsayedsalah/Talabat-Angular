import { IPaginationParams } from "./ipagination-params";

export class ShopParams implements IPaginationParams
{
    pageIndex=0;
    pageSize=0;
    count=0;
    brandId=0;
    typeId=0;
    sort="name";
    search!:string;
}
