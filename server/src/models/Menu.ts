import { SchemaDefinition } from "mongoose";
import NavItem from "./NavItem";

class Menu {
    public constructor(
        public active: boolean = true,
        public navItem: NavItem[] = [],
    ) {};

    public getMongooseSchemaDefinition(): SchemaDefinition {
        return {
            navItems: [ new NavItem().getMongooseSchemaDefinition() ],
            active: {
                type: Boolean,
                required: true,
            }
        }
    }
}

export default Menu;
