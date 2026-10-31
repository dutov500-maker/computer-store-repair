import { createFileRoute } from "@tanstack/react-router";
import PCSelection, { generateServiceSchema } from "@/pages/PCSelection";
import { seoHead } from "@/components/SEO";

export const Route = createFileRoute("/pc-selection")({
  head: () => {
    const base = seoHead("/pc-selection", {
      title: "Сборка компьютера на заказ в Волжском - Игровые и офисные ПК",
      description: "Профессиональная сборка компьютера под ваши задачи в Волжском. Игровые, офисные, рабочие станции. Подбор комплектующих и сборка. Гарантия до 3 лет. ☎️ +7 (995) 027-27-07",
      keywords: "сборка компьютеров волжский, сборка пк на заказ волжский, собрать пк волжский, сборка игрового пк волжский, подбор компьютера волжский, сборка компьютера под ключ волжский",
      ogTitle: "Сборка компьютера на заказ в Волжском",
      ogDescription: "Профессиональная сборка ПК под ваши задачи. Гарантия до 3 лет. ☎️ +7 (995) 027-27-07",
    });
    return {
      ...base,
      scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(generateServiceSchema()) }],
    };
  },
  component: PCSelection,
});
