export class Table {
    public constructor(
        number: string,
        orders: string[],
        public createdAt: Date,
    ) {}
}

/*
* Table create and update request
* */
export interface TableReq extends Omit<Table, "createdAt"> {}

/*
* Table response
* */
export interface TableRes extends Table {
    _id: string;
}
