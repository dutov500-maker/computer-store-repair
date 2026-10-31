import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import ScrollToTop from "@/components/ScrollToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import {FloatingRepairButton} from "@/components/FloatingRepairButton";
import FloatingTelegram from "@/components/FloatingTelegram";
import Error404 from "@/pages/Error404";
import appCss from "@/index.css?url";

const TITLE = "Сборка компьютеров и ремонт ПК в Волжском | Компьютерная Лаборатория";
const DESCRIPTION =
    "Профессиональная сборка игровых и офисных компьютеров в Волжском. Ремонт ПК и ноутбуков с гарантией. Только новые комплектующие. Бесплатная доставка от 50 000₽. ☎️ +7 (995) 027-27-07";
const OG_DESCRIPTION =
    "Профессиональная сборка игровых и офисных компьютеров в Волжском. Ремонт ПК и ноутбуков с гарантией. Только новые комплектующие. ☎️ +7 (995) 027-27-07";
const KEYWORDS =
    "сборка компьютеров волжский, ремонт компьютеров волжский, игровой пк волжский, компьютерная лаборатория, ремонт пк волжский, сборка пк на заказ, купить компьютер волжский, игровой компьютер волжский, офисный компьютер волжский, ремонт ноутбуков волжский, компьютерный мастер волжский, сборка игрового пк, чистка компьютера волжский, замена термопасты волжский, установка windows волжский, компьютерные услуги волжский, ремонт техники волжский, модернизация пк волжский, апгрейд компьютера волжский, мощный пк волжский, компьютер для работы волжский, компьютер для игр волжский, собрать пк волжский, заказать сборку компьютера, компьютерный сервис волжский";
const OG_IMAGE = "https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png";
const FAVICON = "https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png?v=2";
const FONTS =
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap";

const LOCAL_BUSINESS = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "name": "Компьютерная Лаборатория",
    "description": "Профессиональная сборка компьютеров и ремонт ПК в Волжском",
    "url": "https://комплаб.рф",
    "telephone": "+79950272707",
    "email": "complab34@gmail.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Волжский",
        "addressRegion": "Волгоградская область",
        "addressCountry": "RU",
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.7894",
        "longitude": "44.7742",
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "₽₽",
    "image": OG_IMAGE,
    "sameAs": ["https://vk.com/labkomp", "https://wa.me/79950272707"],
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "50",
    },
};

const METRIKA = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104704712', 'ym');
ym(104704712, 'init', {
    ssr:true,
    webvisor:true,
    clickmap:true,
    ecommerce:"dataLayer",
    accurateTrackBounce:true,
    trackLinks:true,
    trackHash:true,
    ut:"noindex"
});`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: KEYWORDS},
            {name: "author", content: "Компьютерная Лаборатория"},
            {name: "robots", content: "index, follow"},
            {name: "googlebot", content: "index, follow"},
            {name: "yandex", content: "index, follow"},
            {httpEquiv: "content-language", content: "ru"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:type", content: "website"},
            {property: "og:url", content: "https://комплаб.рф/"},
            {property: "og:title", content: TITLE},
            {property: "og:description", content: OG_DESCRIPTION},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:width", content: "1200"},
            {property: "og:image:height", content: "630"},
            {property: "og:image:alt", content: "Компьютерная Лаборатория — сборка ПК и ремонт в Волжском"},
            {property: "og:site_name", content: "Компьютерная Лаборатория"},
            {property: "telegram:channel", content: "@labkomp"},
            {property: "og:see_also", content: "https://wa.me/79950272707"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: "Сборка компьютеров и ремонт ПК в Волжском"},
            {
                name: "twitter:description",
                content: "Профессиональная сборка игровых и офисных компьютеров. Ремонт ПК с гарантией. ☎️ +7 (995) 027-27-07",
            },
            {name: "twitter:image", content: OG_IMAGE},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "canonical", href: "https://комплаб.рф/"},
            {rel: "icon", type: "image/png", sizes: "32x32", href: FAVICON},
            {rel: "apple-touch-icon", sizes: "180x180", href: FAVICON},
            {rel: "shortcut icon", href: FAVICON},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {rel: "stylesheet", href: FONTS},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS)},
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: Error404,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster position="top-center" richColors/>
                <ScrollToTop/>
                <Breadcrumbs/>
                <FloatingRepairButton/>
                <FloatingTelegram/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div>
                <img src="https://mc.yandex.ru/watch/104704712" style={{position: "absolute", left: "-9999px"}} alt=""/>
            </div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
