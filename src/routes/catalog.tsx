import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/pages/Catalog";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/catalog")({
  head: () =>
    seoHead("/catalog", {
      title: "Купить компьютер в Волжском — Готовые игровые ПК | K|LAB",
      description: "Купить готовый игровой компьютер в Волжском. Сборки от 95 000₽. Новые комплектующие, гарантия до 3 лет. ☎️ +7 (995) 027-27-07",
    }),
  component: Catalog,
});
