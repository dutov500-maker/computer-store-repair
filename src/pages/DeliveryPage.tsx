import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Icon name="ArrowLeft" size={18} />
                На главную
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">Доставка и оплата</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Удобные способы получения и оплаты заказа
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-heading font-bold mb-4">Способы доставки</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <Icon name="Home" size={24} className="text-primary" />
                          <h3 className="font-semibold text-lg">Самовывоз из офиса</h3>
                        </div>
                        <span className="text-primary font-bold whitespace-nowrap">Бесплатно</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Забрать готовый компьютер можно по адресу в городе Волжский. 
                        Мы проведём тестирование при вас и покажем, как работает ваш новый ПК.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Время работы:</span> Пн-Пт 10:00-20:00, Сб 11:00-18:00
                      </p>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <Icon name="MapPin" size={24} className="text-primary" />
                          <h3 className="font-semibold text-lg">Доставка по городу Волжский</h3>
                        </div>
                        <span className="text-primary font-bold whitespace-nowrap">от 500 ₽</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Доставим компьютер курьером по любому адресу в черте города. 
                        При необходимости поможем с подключением и первым запуском.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Срок доставки: в день готовности или на следующий день</span>
                      </div>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <Icon name="Package" size={24} className="text-primary" />
                          <h3 className="font-semibold text-lg">Доставка по России</h3>
                        </div>
                        <span className="text-primary font-bold whitespace-nowrap">от 1000 ₽</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Отправляем компьютеры транспортными компаниями (СДЭК, Boxberry, Почта России) 
                        в любой город России. Упаковываем надёжно, страхуем груз.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Срок доставки: 3-7 дней в зависимости от региона</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Shield" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Страхование груза включено</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="CreditCard" size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-heading font-bold mb-4">Способы оплаты</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Wallet" size={24} className="text-primary" />
                        <h3 className="font-semibold text-lg">Наличными при получении</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Оплатите заказ наличными курьеру при доставке или в нашем офисе при самовывозе. 
                        Выдаём кассовый чек.
                      </p>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="CreditCard" size={24} className="text-primary" />
                        <h3 className="font-semibold text-lg">Банковской картой</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Принимаем к оплате карты Visa, MasterCard, МИР. Оплата возможна онлайн 
                        или при получении через терминал.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Shield" size={16} />
                        <span>Безопасная оплата через защищённое соединение</span>
                      </div>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Building" size={24} className="text-primary" />
                        <h3 className="font-semibold text-lg">Банковский перевод</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Безналичная оплата по реквизитам для юридических лиц и ИП. 
                        Предоставляем все необходимые документы и закрывающие документы.
                      </p>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Percent" size={24} className="text-primary" />
                        <h3 className="font-semibold text-lg">Рассрочка</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Доступна беспроцентная рассрочка на 3-6 месяцев от банков-партнёров. 
                        Оформление онлайн за 5 минут.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span className="text-muted-foreground">Без первоначального взноса и переплат</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-heading font-bold mb-4">Сроки сборки</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Стандартная конфигурация</span>
                      <span className="text-primary font-bold">1-2 дня</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Индивидуальная конфигурация</span>
                      <span className="text-primary font-bold">3-5 дней</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">С заказом редких комплектующих</span>
                      <span className="text-primary font-bold">5-14 дней</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    * Точные сроки сборки и доставки согласуются при оформлении заказа
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="HelpCircle" size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-4">Часто задаваемые вопросы</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Можно ли внести предоплату?</h3>
                      <p className="text-sm text-muted-foreground">
                        Да, для резервирования комплектующих мы можем принять предоплату 30-50% от стоимости заказа.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Что делать, если при доставке обнаружен дефект?</h3>
                      <p className="text-sm text-muted-foreground">
                        При обнаружении любых дефектов сразу свяжитесь с нами. Мы заберём компьютер, 
                        устраним проблему и вернём бесплатно в кратчайшие сроки.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Выдаёте ли документы?</h3>
                      <p className="text-sm text-muted-foreground">
                        Да, выдаём кассовый чек, гарантийный талон, акт выполненных работ и договор (при необходимости).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}