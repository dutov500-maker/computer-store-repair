import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">Гарантия</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Мы отвечаем за качество нашей работы
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Гарантия на сборку</h2>
                  <p className="text-muted-foreground mb-4">
                    На все наши сборки предоставляется гарантия <span className="font-bold text-primary">12 месяцев</span>. 
                    Это означает, что в течение года мы бесплатно устраним любые неисправности, 
                    связанные с процессом сборки или совместимостью комплектующих.
                  </p>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        Бесплатная диагностика и ремонт при гарантийных случаях
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        Быстрое реагирование — средний срок устранения проблемы 3-5 дней
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        Помощь в оформлении гарантийных случаев по комплектующим
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="Package" size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Гарантия на комплектующие</h2>
                  <p className="text-muted-foreground mb-4">
                    Все комплектующие, которые мы используем, имеют официальную гарантию от производителя:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Процессоры</span>
                      <span className="text-primary font-bold">1-3 года</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Видеокарты</span>
                      <span className="text-primary font-bold">2-3 года</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Материнские платы</span>
                      <span className="text-primary font-bold">3 года</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Оперативная память</span>
                      <span className="text-primary font-bold">Пожизненная</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Накопители (SSD/HDD)</span>
                      <span className="text-primary font-bold">3-5 лет</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Блоки питания</span>
                      <span className="text-primary font-bold">3-10 лет</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                      <span className="font-semibold">Корпуса</span>
                      <span className="text-primary font-bold">1-2 года</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Все комплектующие поставляются с официальными гарантийными талонами
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="FileText" size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Условия гарантии</h2>
                  <p className="text-muted-foreground mb-4">
                    Гарантия распространяется на следующие случаи:
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">
                        Неисправности, возникшие по вине некачественной сборки
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">
                        Проблемы совместимости компонентов, не выявленные при тестировании
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">
                        Производственный брак комплектующих (в рамках гарантии производителя)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">
                        Сбои в работе системы охлаждения, связанные с монтажом
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertTriangle" size={20} className="text-destructive mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-destructive mb-2">Гарантия не распространяется на:</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Механические повреждения, полученные после передачи клиенту</li>
                          <li>• Повреждения от жидкости, огня, перепадов напряжения</li>
                          <li>• Самостоятельный ремонт или модификация без согласования</li>
                          <li>• Естественный износ комплектующих</li>
                          <li>• Программные ошибки операционной системы (кроме случаев предустановки ОС нами)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 gradient-card animate-slide-in-up hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Icon name="Headphones" size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Как воспользоваться гарантией?</h2>
                  <div className="space-y-4 mt-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Свяжитесь с нами</h3>
                        <p className="text-sm text-muted-foreground">
                          Опишите проблему по телефону, в WhatsApp или Telegram
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Диагностика</h3>
                        <p className="text-sm text-muted-foreground">
                          Мы проведём удалённую или очную диагностику проблемы
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Решение</h3>
                        <p className="text-sm text-muted-foreground">
                          Устраним неисправность бесплатно в рамках гарантийного срока
                        </p>
                      </div>
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
