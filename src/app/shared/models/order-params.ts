import { IPaginationParams } from "./ipagination-params";

export class OrderParams implements IPaginationParams {
    pageIndex=0;
    pageSize=0;
    count=0;
    sort='dateDesc';
    status!:string;
}
