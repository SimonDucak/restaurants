import { MenuItem } from "./Menu";

export class Order {
    public constructor(
        public createdAt: Date,
        public menuItem: MenuItem,
    ) {}
}

/*
* Order create and update request
* */
export interface OrderReq extends Omit<Order, "createdAt"> {}

/*
* Order response
* */
export interface OrderRes extends Order {
    _id: string;
}
