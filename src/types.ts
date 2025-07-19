export interface MenuItem {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  picture?: string;
  category: string;
  amount: number;
  unavailable?: boolean;
}

export interface AppState {
  menu_items: MenuItem[];
  total: number;
  filter: string;
}
