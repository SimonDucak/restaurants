export class MenuItem {
    public constructor(
        public name: string = "",
        public price: number = 0,
        public description: string = "",
    ) {}
}

export class MenuSection {
    public constructor(
       public menuItems: MenuItem[] = [],
    ) {}
}

export class Menu {
    public constructor(
        public menuSections: MenuSection[] = [],
    ) {};
}
