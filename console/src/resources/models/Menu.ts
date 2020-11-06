export interface MenuItem {
    name: string;
    price: number;
    description: string;
}

export interface MenuSection {
    name: string;
    menuItems: MenuItem[];
}

export class Menu {
    public constructor(
        public createdAt: Date,
        public menuSections: MenuSection[],
    ) {};
}
