// LocalStorage utility for managing app data

const STORAGE_KEYS = {
  SERVICES: 'app_services',
  CATALOG: 'app_catalog',
  PORTFOLIO: 'app_portfolio',
  REQUESTS: 'app_requests',
  SETTINGS: 'app_settings',
};

// Default data
const DEFAULT_SERVICES = [
  {
    id: 1,
    title: 'Диагностика компьютера',
    description: 'Полная проверка всех компонентов и выявление неисправностей',
    price: 'от 500₽',
    features: ['Проверка железа', 'Тестирование ПО', 'Отчет о состоянии'],
    icon: 'Search',
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Замена комплектующих',
    description: 'Установка новых или замена неисправных деталей',
    price: 'от 800₽',
    features: ['Подбор комплектующих', 'Установка', 'Тестирование'],
    icon: 'HardDrive',
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'Чистка от пыли',
    description: 'Профессиональная чистка системы охлаждения',
    price: 'от 1000₽',
    features: ['Разборка', 'Чистка радиаторов', 'Замена термопасты'],
    icon: 'Wind',
    display_order: 3,
    is_active: true,
  },
];

const DEFAULT_CATALOG = [
  {
    id: 1,
    title: 'Игровой ПК "Стартовый"',
    description: 'Отличный выбор для начинающих геймеров',
    price: 45000,
    resolution: 'Full HD',
    specs: {
      cpu: 'Intel Core i3-12100F',
      gpu: 'GTX 1650',
      ram: '16GB DDR4',
      storage: '512GB SSD',
    },
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Игровой ПК "Оптимальный"',
    description: 'Играй в Full HD на ультра настройках',
    price: 75000,
    resolution: 'Full HD',
    specs: {
      cpu: 'Intel Core i5-13400F',
      gpu: 'RTX 4060',
      ram: '16GB DDR4',
      storage: '1TB NVMe SSD',
    },
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
    display_order: 2,
    is_active: true,
  },
];

const DEFAULT_PORTFOLIO = [
  {
    id: 1,
    title: 'Игровой системный блок для 4K гейминга',
    description: 'Мощная сборка для 4K-гейминга с RTX 4080',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Компактный офисный ПК',
    description: 'Тихая и производительная сборка для работы',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
    display_order: 2,
    is_active: true,
  },
];

const DEFAULT_SETTINGS = {
  company_name: 'Компьютерная Лаборатория',
  phone: '+7 (999) 950-27-27',
  email: 'info@klab.ru',
  address: 'Москва',
  work_hours: 'Пн-Пт: 9:00-18:00',
  about_text: 'Профессиональная сборка и ремонт компьютеров',
};

// Initialize localStorage with default data if empty
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATALOG)) {
    localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(DEFAULT_CATALOG));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEFAULT_PORTFOLIO));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
}

// Services
export function getServices() {
  const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return data ? JSON.parse(data) : DEFAULT_SERVICES;
}

export function saveServices(services: any[]) {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
}

export function addService(service: any) {
  const services = getServices();
  const newService = {
    ...service,
    id: Math.max(0, ...services.map((s: any) => s.id)) + 1,
  };
  services.push(newService);
  saveServices(services);
  return newService;
}

export function updateService(id: number, updates: any) {
  const services = getServices();
  const index = services.findIndex((s: any) => s.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updates };
    saveServices(services);
  }
}

export function deleteService(id: number) {
  const services = getServices().filter((s: any) => s.id !== id);
  saveServices(services);
}

// Catalog
export function getCatalog() {
  const data = localStorage.getItem(STORAGE_KEYS.CATALOG);
  return data ? JSON.parse(data) : DEFAULT_CATALOG;
}

export function saveCatalog(catalog: any[]) {
  localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalog));
}

export function addCatalogItem(item: any) {
  const catalog = getCatalog();
  const newItem = {
    ...item,
    id: Math.max(0, ...catalog.map((c: any) => c.id)) + 1,
  };
  catalog.push(newItem);
  saveCatalog(catalog);
  return newItem;
}

export function updateCatalogItem(id: number, updates: any) {
  const catalog = getCatalog();
  const index = catalog.findIndex((c: any) => c.id === id);
  if (index !== -1) {
    catalog[index] = { ...catalog[index], ...updates };
    saveCatalog(catalog);
  }
}

export function deleteCatalogItem(id: number) {
  const catalog = getCatalog().filter((c: any) => c.id !== id);
  saveCatalog(catalog);
}

// Portfolio
export function getPortfolio() {
  const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
  return data ? JSON.parse(data) : DEFAULT_PORTFOLIO;
}

export function savePortfolio(portfolio: any[]) {
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
}

export function addPortfolioItem(item: any) {
  const portfolio = getPortfolio();
  const newItem = {
    ...item,
    id: Math.max(0, ...portfolio.map((p: any) => p.id)) + 1,
  };
  portfolio.push(newItem);
  savePortfolio(portfolio);
  return newItem;
}

export function updatePortfolioItem(id: number, updates: any) {
  const portfolio = getPortfolio();
  const index = portfolio.findIndex((p: any) => p.id === id);
  if (index !== -1) {
    portfolio[index] = { ...portfolio[index], ...updates };
    savePortfolio(portfolio);
  }
}

export function deletePortfolioItem(id: number) {
  const portfolio = getPortfolio().filter((p: any) => p.id !== id);
  savePortfolio(portfolio);
}

// Requests
export function getRequests() {
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  return data ? JSON.parse(data) : [];
}

export function saveRequests(requests: any[]) {
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
}

export function addRequest(request: any) {
  const requests = getRequests();
  const newRequest = {
    ...request,
    id: Math.max(0, ...requests.map((r: any) => r.id)) + 1,
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  requests.unshift(newRequest);
  saveRequests(requests);
  return newRequest;
}

export function updateRequest(id: number, updates: any) {
  const requests = getRequests();
  const index = requests.findIndex((r: any) => r.id === id);
  if (index !== -1) {
    requests[index] = { 
      ...requests[index], 
      ...updates,
      updated_at: new Date().toISOString(),
    };
    saveRequests(requests);
  }
}

// Settings
export function getSettings() {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return data ? JSON.parse(data) : DEFAULT_SETTINGS;
}

export function saveSettings(settings: any) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}
