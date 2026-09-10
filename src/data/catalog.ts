export const CATALOG_DATA = [
  {
    id: 1,
    title: "K Lab Start",
    description: "Начальная сборка для комфортного гейминга в 1080p — CS2, Dota 2, World of Tanks на высоких настройках",
    price: 95000,
    resolution: "Full HD",
    category: "ECO",
    brand: "AMD",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/cea21748-5ec6-408f-b546-8327148e1f74.jpg",
    tags: ["Хит для 1080p", "CS2 / Dota / Tanks"],
    specs: {
      cpu: "AMD Ryzen 5 5500",
      gpu: "RTX 5050",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB M.2 NVMe SSD"
    }
  },
  {
    id: 2,
    title: "K Lab Core",
    description: "Оптимальная сборка для Full HD на ультра-настройках в современных играх",
    price: 115000,
    resolution: "Full HD",
    category: "SPECIAL",
    brand: "AMD",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/2bf793f7-a11d-4360-af57-6f4894c84f63.jpg",
    tags: ["Ультра 1080p"],
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "RTX 5060",
      ram: "16GB DDR4 3600MHz",
      storage: "1TB M.2 NVMe SSD"
    }
  },
  {
    id: 3,
    title: "K Lab Pulse",
    description: "Сбалансированная сборка на Intel с уверенным входом в QHD-гейминг",
    price: 125000,
    resolution: "Full HD",
    category: "SPECIAL",
    brand: "Intel",
    outOfStock: true,
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/76a2e785-c341-462e-bd95-4944011f5f39.jpg",
    tags: ["Вход в 2K"],
    specs: {
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 5060 Ti",
      ram: "16GB DDR4 3200MHz",
      storage: "1TB M.2 NVMe SSD"
    }
  },
  {
    id: 4,
    title: "K Lab Strike",
    description: "Новая платформа AM5 с DDR5 — быстрая база для игр и многозадачности",
    price: 145000,
    resolution: "Full HD",
    category: "SPECIAL",
    brand: "AMD",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/c652df5b-178e-4177-a036-4425e5c2c40c.jpg",
    tags: ["DDR5 База"],
    specs: {
      cpu: "AMD Ryzen 5 7500F",
      gpu: "RTX 5060",
      ram: "32GB DDR5 6000MHz",
      storage: "1TB M.2 NVMe SSD PCIe 4.0"
    }
  },
  {
    id: 5,
    title: "K Lab Strike Plus",
    description: "Продвинутая сборка на AM5 для стабильного QHD-гейминга",
    price: 154000,
    resolution: "QHD",
    category: "SPECIAL",
    brand: "AMD",
    outOfStock: true,
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/eac9fcd2-cb64-4b3a-9672-ddcaad87f917.jpg",
    tags: ["Баланс для 2K"],
    specs: {
      cpu: "AMD Ryzen 5 7500F",
      gpu: "RTX 5060 Ti 8GB",
      ram: "32GB DDR5 6000MHz",
      storage: "1TB M.2 NVMe SSD PCIe 4.0"
    }
  },
  {
    id: 6,
    title: "K Lab Strike Pro",
    description: "Максимум видеопамяти на AM5-платформе для требовательных проектов и игр",
    price: 159000,
    resolution: "QHD",
    category: "SPECIAL",
    brand: "AMD",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/a844d193-9248-4c28-a55f-e304ee91ef43.jpg",
    tags: ["16GB VRAM"],
    specs: {
      cpu: "AMD Ryzen 5 7500F",
      gpu: "RTX 5060 Ti 16GB",
      ram: "32GB DDR5 6000MHz",
      storage: "1TB M.2 NVMe SSD PCIe 4.0"
    }
  },
  {
    id: 7,
    title: "Orange Edition",
    description: "Фирменная сборка K Lab в узнаваемом оранжевом стиле — плотный QHD-гейминг без компромиссов",
    price: 160000,
    resolution: "QHD",
    category: "PREMIUM",
    brand: "Intel",
    signature: "orange",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/9bee5dc3-e33b-4513-888e-fa7297d36aa0.jpg",
    tags: ["ХИТ K Lab", "Orange Style", "Плотный 2K"],
    specs: {
      cpu: "Intel Core i5-13400F",
      gpu: "RTX 5070",
      ram: "32GB DDR5",
      storage: "1TB M.2 NVMe SSD PCIe 4.0",
      cooling: "Башенный кулер с медными трубками, фирменный оранжевый акцент"
    }
  },
  {
    id: 8,
    title: "Graphite Edition",
    description: "8 ядер AMD для игр, стриминга и рендера — универсальная рабочая станция",
    price: 179000,
    resolution: "QHD",
    category: "PREMIUM",
    brand: "AMD",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/7f65e887-bb08-421c-afbd-2a8653b47d4f.jpg",
    tags: ["8 ядер AM5", "Стриминг / Рендер"],
    specs: {
      cpu: "AMD Ryzen 7 8700F",
      gpu: "RTX 5060 Ti 16GB",
      ram: "32GB DDR5 6000MHz",
      storage: "1TB M.2 NVMe SSD PCIe 4.0"
    }
  },
  {
    id: 9,
    title: "Intel Vector",
    description: "Сборка на новейшей платформе Intel Arrow Lake для мощного QHD-гейминга",
    price: 195000,
    resolution: "QHD",
    category: "PREMIUM",
    brand: "Intel",
    outOfStock: true,
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/217c1164-b977-4217-a993-7b10b3f726dc.jpg",
    tags: ["Arrow Lake", "2K Ultra"],
    specs: {
      cpu: "Intel Core Ultra 5 245KF",
      gpu: "RTX 5070",
      ram: "32GB DDR5 6400MHz",
      storage: "1TB M.2 NVMe SSD PCIe 4.0"
    }
  },
  {
    id: 10,
    title: "Snow Edition",
    description: "Фирменная белая сборка K Lab — total white дизайн с продуманной эстетикой",
    price: 209000,
    resolution: "QHD",
    category: "ULTRA",
    brand: "AMD",
    signature: "snow",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/9f222e7d-da84-4ccc-8ea2-25b2adb74ade.jpg",
    tags: ["Snow White", "Total White", "Эстетика"],
    specs: {
      cpu: "AMD Ryzen 7 7700",
      gpu: "RTX 5070",
      ram: "32GB DDR5 6000MHz White",
      storage: "1TB M.2 NVMe SSD PCIe 4.0",
      cooling: "Белый корпус-аквариум, полностью белое исполнение"
    }
  },
  {
    id: 11,
    title: "Intel Vector Pro",
    description: "Разогнанная версия Intel Vector — предтоповая производительность для 2K Ultra",
    price: 209000,
    resolution: "QHD",
    category: "ULTRA",
    brand: "Intel",
    outOfStock: true,
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/217c1164-b977-4217-a993-7b10b3f726dc.jpg",
    tags: ["Overclocked"],
    specs: {
      cpu: "Intel Core Ultra 5 245KF",
      gpu: "RTX 5070 OC",
      ram: "32GB DDR5 6400MHz",
      storage: "2TB M.2 NVMe SSD PCIe 4.0"
    }
  },
  {
    id: 12,
    title: "Snow Edition Alpha",
    description: "Топовая версия белой серии с кастомной СЖО — максимум производительности в белом",
    price: 209000,
    resolution: "QHD",
    category: "ULTRA",
    brand: "AMD",
    signature: "snow",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/8f33e0c6-438f-4ea1-be01-ddbc6cde511e.jpg",
    tags: ["White Custom"],
    specs: {
      cpu: "AMD Ryzen 7 7700",
      gpu: "RTX 5070 White OC",
      ram: "32GB DDR5 White",
      storage: "2TB M.2 NVMe SSD",
      cooling: "СЖО 240/360mm White"
    }
  },
  {
    id: 13,
    title: "Obsidian Edition",
    description: "Флагманская сборка с 3D V-Cache для 2K/4K гейминга без компромиссов",
    price: 260000,
    resolution: "4K",
    category: "ULTRA",
    brand: "AMD",
    signature: "obsidian",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/f5dc9a18-cfa2-4daa-9cd3-1b4d92652900.jpg",
    tags: ["3D V-Cache", "Флагман 2K/4K"],
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5070 Ti",
      ram: "32GB DDR5 6000MHz CL30",
      storage: "2TB M.2 NVMe SSD PCIe 4.0",
      cooling: "СЖО 360mm"
    }
  },
  {
    id: 14,
    title: "Obsidian Edition Alpha",
    description: "Строгий чёрный стиль и топовый разгон видеокарты — премиальная производительность",
    price: 290000,
    resolution: "4K",
    category: "ULTRA",
    brand: "AMD",
    signature: "obsidian",
    outOfStock: true,
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/afea9e97-6dd2-402c-a445-1eb7e176a2b4.jpg",
    tags: ["Total Black", "Top Performance"],
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5070 Ti Top OC",
      ram: "32/64GB DDR5 6000MHz",
      storage: "2TB Gen4 high-speed",
      cooling: "Премиум кастом / СЖО, строгий чёрный стиль"
    }
  },
  {
    id: 15,
    title: "Glacier Edition",
    description: "Ультимативная сборка для 4K гейминга на новейшем 9800X3D",
    price: 320000,
    resolution: "4K",
    category: "ELITE",
    brand: "AMD",
    signature: "glacier",
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/3cc816c6-a1fb-4243-ac6d-9f658933f768.jpg",
    tags: ["4K Ultra Gaming", "9800X3D"],
    specs: {
      cpu: "AMD Ryzen 7 9800X3D",
      gpu: "RTX 5080",
      ram: "32/64GB DDR5 6000+ MHz",
      storage: "2TB NVMe PCIe 4.0/5.0",
      cooling: "Топовая СЖО 360mm"
    }
  },
  {
    id: 16,
    title: "Glacier Edition Apex",
    description: "Бескомпромиссный флагман K Lab — максимум мощности и объёма для самых требовательных задач",
    price: 345000,
    resolution: "4K",
    category: "ELITE",
    brand: "AMD",
    signature: "glacier",
    outOfStock: true,
    image_url: "https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/5f1f9f5a-771d-42f1-871d-5d49173ebdb4.jpg",
    tags: ["Максимум K Lab", "Бескомпромиссный топ"],
    specs: {
      cpu: "AMD Ryzen 7 9800X3D",
      gpu: "RTX 5080 Flagship OC",
      ram: "64GB DDR5",
      storage: "2TB + 2TB High-Speed SSD",
      cooling: "Кастомная система охлаждения K Lab"
    }
  }
];