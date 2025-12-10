import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Task {
  id: number;
  title: string;
  time: string;
  duration: number;
  completed: boolean;
  category: string;
}

interface Reminder {
  id: number;
  text: string;
  time: string;
  sound: string;
  vibration: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Утренняя медитация', time: '08:00', duration: 15, completed: true, category: 'wellness' },
    { id: 2, title: 'Работа над проектом', time: '10:00', duration: 90, completed: false, category: 'work' },
    { id: 3, title: 'Перерыв и прогулка', time: '12:00', duration: 30, completed: false, category: 'break' },
    { id: 4, title: 'Обучение', time: '14:00', duration: 60, completed: false, category: 'learning' },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, text: 'Пора сделать перерыв!', time: '11:30', sound: 'gentle', vibration: true },
    { id: 2, text: 'Не забудь попить воды', time: '13:00', sound: 'water', vibration: false },
    { id: 3, text: 'Время для дыхательных упражнений', time: '16:00', sound: 'calm', vibration: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const aiAdvices = [
    { icon: 'Brain', title: 'Техника Помодоро', description: 'Работай 25 минут, отдыхай 5. Это поможет сохранить фокус.' },
    { icon: 'Heart', title: 'Дыхательная практика', description: 'Сделай 5 глубоких вдохов, чтобы успокоить нервную систему.' },
    { icon: 'Sparkles', title: 'Разбей задачу', description: 'Большие задачи можно разделить на маленькие шаги по 10 минут.' },
    { icon: 'Lightbulb', title: 'Двигательная активность', description: 'Каждый час делай 2-минутную разминку для концентрации.' },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      wellness: 'bg-muted text-muted-foreground',
      work: 'bg-primary/20 text-primary-foreground',
      break: 'bg-secondary text-secondary-foreground',
      learning: 'bg-accent text-accent-foreground',
    };
    return colors[category] || 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            FocusFlow
          </h1>
          <p className="text-muted-foreground text-lg">
            Твой персональный помощник с СДВГ
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8 h-auto p-2 bg-card/50 backdrop-blur">
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/20">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/20">
              <Icon name="Calendar" size={20} />
              <span className="text-xs">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/20">
              <Icon name="Bell" size={20} />
              <span className="text-xs">Напоминания</span>
            </TabsTrigger>
            <TabsTrigger value="advice" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/20">
              <Icon name="Sparkles" size={20} />
              <span className="text-xs">Советы</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/20">
              <Icon name="TrendingUp" size={20} />
              <span className="text-xs">Прогресс</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary/20">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" size={24} className="text-primary" />
                  Сегодняшний прогресс
                </CardTitle>
                <CardDescription>Отлично! Ты выполнил {completedTasks} из {tasks.length} задач</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-3 mb-4" />
                <div className="grid gap-3">
                  {tasks.slice(0, 3).map(task => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                      }`}>
                        {task.completed && <Icon name="Check" size={14} className="text-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{task.time} • {task.duration} мин</p>
                      </div>
                      <Badge className={getCategoryColor(task.category)}>
                        {task.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  ИИ-совет дня
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Brain" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Техника "5-4-3-2-1" для заземления</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Когда чувствуешь перегрузку, назови: 5 вещей, которые видишь, 4 звука, 3 вещи, которых касаешься, 
                        2 запаха и 1 вкус. Это поможет вернуться в настоящий момент.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-primary" />
                  Ближайшие напоминания
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reminders.slice(0, 2).map(reminder => (
                  <div key={reminder.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{reminder.text}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Icon name="Volume2" size={12} />
                      {reminder.sound}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} className="text-primary" />
                  Расписание на сегодня
                </CardTitle>
                <CardDescription>Нажми на задачу, чтобы отметить её выполненной</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted/50 transition-all cursor-pointer border-2 border-border hover:border-primary/30"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                    }`}>
                      {task.completed && <Icon name="Check" size={16} className="text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {task.time}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="Timer" size={14} />
                          {task.duration} мин
                        </span>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(task.category)}>
                      {task.category}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full mt-4 h-12 text-base" size="lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить задачу
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="animate-fade-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-primary" />
                  Мои напоминания
                </CardTitle>
                <CardDescription>Настрой звуки и вибрацию для каждого напоминания</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reminders.map(reminder => (
                  <div key={reminder.id} className="p-4 rounded-xl border-2 border-border bg-card space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name="Bell" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{reminder.text}</p>
                        <p className="text-muted-foreground mt-1">{reminder.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-13">
                      <div className="flex items-center gap-2">
                        <Icon name="Volume2" size={16} className="text-muted-foreground" />
                        <span className="text-sm">Звук: {reminder.sound}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`vib-${reminder.id}`} className="text-sm">Вибрация</Label>
                        <Switch id={`vib-${reminder.id}`} checked={reminder.vibration} />
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4 h-12 text-base" size="lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать напоминание
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Доступные звуки уведомлений</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Gentle', 'Water', 'Calm', 'Bird', 'Wind', 'Chime'].map(sound => (
                  <Button key={sound} variant="outline" className="h-16 text-base">
                    <Icon name="Music" size={18} className="mr-2" />
                    {sound}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advice" className="animate-fade-in">
            <div className="grid gap-6">
              {aiAdvices.map((advice, index) => (
                <Card key={index} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={advice.icon as any} size={28} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{advice.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{advice.description}</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Попробовать сейчас
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={24} className="text-primary" />
                    Спроси у ИИ-помощника
                  </CardTitle>
                  <CardDescription>Опиши свою ситуацию, и я дам персональный совет</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea 
                    placeholder="Например: Я не могу сосредоточиться на работе уже 2 часа..." 
                    className="min-h-24 resize-none"
                  />
                  <Button className="w-full h-12 text-base">
                    <Icon name="Send" size={18} className="mr-2" />
                    Получить совет
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="animate-fade-in">
            <Card className="border-2 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} className="text-primary" />
                  Твои достижения
                </CardTitle>
                <CardDescription>Следи за прогрессом и отмечай успехи</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Выполнено задач сегодня</span>
                      <span className="text-primary font-bold">{completedTasks}/{tasks.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-4" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">7</div>
                      <div className="text-sm text-muted-foreground">Дней подряд</div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">42</div>
                      <div className="text-sm text-muted-foreground">Задач за неделю</div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">5.2</div>
                      <div className="text-sm text-muted-foreground">Часов фокуса</div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">12</div>
                      <div className="text-sm text-muted-foreground">Советов применено</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" size={24} className="text-primary" />
                  Награды и бейджи
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: 'Flame', title: 'Неделя подряд', unlocked: true },
                  { icon: 'Zap', title: 'Быстрый старт', unlocked: true },
                  { icon: 'Star', title: '50 задач', unlocked: false },
                  { icon: 'Trophy', title: 'Месяц успеха', unlocked: false },
                  { icon: 'Heart', title: 'Забота о себе', unlocked: true },
                  { icon: 'Target', title: 'Точность 90%', unlocked: false },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl text-center transition-all ${
                      badge.unlocked 
                        ? 'bg-primary/20 border-2 border-primary/30' 
                        : 'bg-muted/30 opacity-50 grayscale'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                      badge.unlocked ? 'bg-primary/30' : 'bg-muted'
                    }`}>
                      <Icon name={badge.icon as any} size={32} className={badge.unlocked ? 'text-primary' : ''} />
                    </div>
                    <p className="font-semibold text-sm">{badge.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} className="text-primary" />
                  Мой профиль
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="User" size={40} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Пользователь</h3>
                    <p className="text-muted-foreground">Активен 7 дней</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Введи своё имя" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="твой@email.com" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={24} className="text-primary" />
                  Настройки уведомлений
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 'push', label: 'Push-уведомления', checked: true },
                  { id: 'sound', label: 'Звуковые сигналы', checked: true },
                  { id: 'vibration', label: 'Вибрация', checked: true },
                  { id: 'daily', label: 'Ежедневные напоминания', checked: true },
                  { id: 'tips', label: 'Советы от ИИ', checked: true },
                ].map(setting => (
                  <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                    <Label htmlFor={setting.id} className="cursor-pointer flex-1">
                      {setting.label}
                    </Label>
                    <Switch id={setting.id} defaultChecked={setting.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
