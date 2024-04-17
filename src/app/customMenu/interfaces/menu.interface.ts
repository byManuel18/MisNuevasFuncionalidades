
export interface Menu {
  menuItems: MenuItem[];
}

export interface MenuItem {
  title: string;
  link: string;
  items?: MenuItem[];
  icon?: string;
}
