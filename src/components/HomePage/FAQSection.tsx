import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">❓ FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Частые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ответы на популярные вопросы о сборке компьютеров
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 md:p-8 bg-card/30 backdrop-blur-sm border-primary/20 shadow-xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Какие гарантии на собранный компьютер?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Мы предоставляем гарантию до 3 лет на все комплектующие. Бесплатный ремонт и техническая поддержка в течение всего гарантийного срока. Работаем только с официальными поставщиками.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Как долго собирается компьютер?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Стандартная сборка занимает 1-3 рабочих дня. Если все комплектующие есть в наличии - можем собрать за 1 день. При необходимости заказа редких компонентов срок может увеличиться до 5-7 дней.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Можно ли изменить комплектацию готовой сборки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Да, абсолютно! Все наши сборки можно кастомизировать под ваши задачи и бюджет. Мы поможем подобрать оптимальные комплектующие с учётом ваших пожеланий.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Есть ли доставка в другие города?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Да, доставляем по всей России. Бесплатная доставка по России от 100 000 ₽, по Волжскому от 50 000 ₽. Надёжно упаковываем каждый компьютер для безопасной транспортировки.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Помогаете ли вы с выбором комплектующих?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Конечно! Наши специалисты бесплатно проконсультируют вас и подберут оптимальную конфигурацию под ваши задачи и бюджет. Просто напишите нам в Telegram или WhatsApp.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Какие способы оплаты доступны?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Принимаем наличные, безналичный расчёт, переводы на карту. Для юридических лиц работаем по безналу с НДС. Возможна рассрочка на крупные заказы.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
};