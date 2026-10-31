import { createFileRoute } from "@tanstack/react-router";
import Services from "@/pages/Services";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/services")({
  head: () =>
    seoHead("/services", {
      title: "Ремонт компьютеров в Волжском | K|LAB — Мастерская",
      description: "Ремонт компьютеров, ноутбуков, планшетов в Волжском. Диагностика 0₽. Гарантия 1 год. Вызов мастера на дом. ☎️ +7 995 027-27-07",
    }),
  component: Services,
});
