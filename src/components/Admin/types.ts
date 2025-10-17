export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  order_type: string;
  item_title?: string;
  message?: string;
  status: string;
  created_at: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  specs?: string;
  price_range?: string;
  completion_date?: string;
  is_active: boolean;
}

export interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  image_url: string;
  is_active: boolean;
}
