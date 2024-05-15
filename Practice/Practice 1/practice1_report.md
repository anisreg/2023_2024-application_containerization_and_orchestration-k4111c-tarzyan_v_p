```
University: [ITMO University](https://itmo.ru/ru/)
Faculty: [FICT](https://fict.itmo.ru)
Course: [Application containerization and orchestration](https://github.com/itmo-ict-faculty/application-containerization-and-orchestration)
Year: 2023/2024
Group: K4111c
Author: Tarzyan Vera Pavlovna
Practice: practice1
Date of create: 
Date of finished: 
```

Для выполнения практической работы напишем приложение на языке JavaScript, которое будет отвечать следующим требованиям:
- Выполняет одну полезную функцию: приложение говорит вам, какой вы сегодня зверёк
- Может быть контейнеризировано: создадим образ из всего необходимого для запуска приложения и отправим его в Docker Hub
- Может хранить/записывать данные в БД: для этого подключим БД Mongo

Ход работы:
1. Подключаем БД.
 - Для этого скачаем в docker образ mongo:latest с Docker Hub, и ПО MongoDB Compass. Запускаем контейнер на основе образа БД и соединяемся с компасом.
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/5e73e7a0-a066-4ca8-972e-78d2e6aeb7e3)
 - Там мы создадим базу данных animals, а внутри 2 коллекции для хранения и записи соответственно:

   в коллекцию animals загрузим данные о животных в виде json. файла, который мы нашли в интернете
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/3602eaa3-dfa3-4c27-86f3-c40d3acc3b03)

   в коллекцию users будут загружаться данные о пользователях
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/30e176ea-e6b0-42ff-a543-eb510f55aafc)
2. Создаём серверную часть
 - Устанавливаем Express Node.js, которая будет обрабатывать запросы при помощи команды npm install express --save
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/985b88f8-27ee-4be3-91fd-847bea993a57)
 - Поднимаем ноду и проверяем её работоспособность на localhost:3000, добавляем функцию для подключения к БД (строчки 13-15)
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/0863dc39-3ac5-4ffd-bc44-63b7142f029c)
 - Подключаем библиотеку mongoose для упрощения работы с БД, в файле schemas.js описываем представление данных нашего приложения в БД
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/0dd9fb43-257e-4391-b7ac-5b9049386e4f)
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/2bffa1f9-070b-4bf6-8cb2-d23d7b0e5d90)
 - Создаём и украшаем страничку для нашего приложения, добавляем кнопки и енота.
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/648da695-f60a-472e-a9b3-2b05db8862b0)
 - Запускаем ноду при помощи команды node app.js и пробуем подключаемся через localhost:3000
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/654d53d0-c0a8-41e1-adb1-6c78ef43a92b)
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/a57bcc95-8485-4b69-92ef-24a095513a49)
 - Пробуем нашу программу: вводим имя и жмём на кнопку "какой я зверёк?". Получаем ответ:
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/d94087bb-07a0-4de4-9b97-3ddf7f100c16)
 - Если нажать на "сбросить" а затем снова попробовать удачу, БД выдаёт нового зверька:
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/6fa37f5e-9f71-45f7-9de5-f66a57b5516f)
 - Проверяем записи в БД: видим нашу активность с камышовым котом.
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/cdb1c6de-6fe9-416a-99c9-50f4abb6d100)
 
 Программа работает. Ура.
 
3. Создаём Docker образ
- Для этого создаём в локальном репозитории Dockerfile, в котором указываем используемый в качестве базового образ (в нашем случае alpine), рабочую директорию, и непосредственно команду для запуска программы:
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/5fdcc3ff-28f8-456c-9340-794f86f333f3)
- Собираем образ при помощи команды docker build -t "название" .
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/40849361-0e19-41cb-9c76-c4e04a261128)
- Проверяем наличие образа в Докере:
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/385bfd21-7d92-4753-a390-9ee33b41a9d2)
- Пробуем запустить контейнер, указав в настройках порт 3000.
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/da5dc773-f151-4217-8132-aff838853f7a)
- Видим, что приложение работает, но зверька не выдаёт, а контейнер умирает после первого запуска:
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/e5683436-1489-400c-bc9f-4121b27820ff)

  Это происходит потому, что приложение не может подключиться к базе данных, образ которой находится на другом контейнере, а связь между ними не настроена (это довольно трудоемкий процесс)

- Таким образом, желающий запустить программу, должен выполнить следующие несколько шагов:
  1. Запуллить контейнер с программой
  2. Запуллить контейнер с БД Mongo
  3. Скачать ПО MongoDB Compass
  4. Создать там локальную БД, добавить 2 коллекции: users и animals. В animals загрузить json файл, находящийся в этом репозитории.
  5. Подключить контейнер Mongo к базе данных
  И приложение заработает!
- Финальный штрих: пушим образ программы в Docker Hub при помощи команды docker push
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/ed7b7ecb-086f-4804-a92e-c63177f961f7)
- Проверяем наличие образа в Docker Hub:
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/42f23c41-4c65-4dd1-be5b-8fc1ba6f51e3)










   
