```
![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/ed0133c7-ce7c-4404-b71e-44fe0cce2397)```
University: [ITMO University](https://itmo.ru/ru/)
Faculty: [FICT](https://fict.itmo.ru)
Course: [Application containerization and orchestration](https://github.com/itmo-ict-faculty/application-containerization-and-orchestration)
Year: 2023/2024
Group: K4111c
Author: Tarzyan Vera Pavlovna
Practice: practice3
Date of create: 
Date of finished:
```

Цель: установить и настроить специальные инструменты для автоматизации процесса тестирования и развертывания программного обеспечения.

*Ход работы:*

Для реализации CI/CD был выбран инструмент Github Actions. Работа велась на готовом фронтенд-проекте, написанном на Vuejs.

В качестве почтового клиента был выбран smtp.mail.ru.

**Файл github-actions**
```
name: master
on:
  push:
      branches:
      - "master"
      tags:
      - "v*"
  pull_request:
      branches:
      - "master"

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - name: Install NodeJS
        uses: actions/setup-node@v2
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Code Checkout
        uses: actions/checkout@v2

      - name: Install Dependencies
        run: npm ci

      - name: Code Linting
        run: npm run lint
  docker:
      needs: lint
      name: Build and push to DockerHub
      runs-on: ubuntu-latest
      steps:
      - name: Check out the repo
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@f4ef78c080cd8ba55a85445d5b36e214a81df20a
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@9ec57ed1fcdbf14dcef7dfbe97b2010124a938b7
        with:
          images: anisreg/cao_3

      - name: Build and push Docker image
        id: push
        uses: docker/build-push-action@3b5e8027fcad23fda98b2e3ac259d8d67585f671
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
  email:
      needs: docker
      if: always()
      name: Send email
      runs-on: ubuntu-latest
      steps:
      - name: Send mail
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.mail.ru
          server_port: 465
          username: ${{secrets.MAIL_USERNAME}}
          password: ${{secrets.MAIL_PASSWORD}}
          subject: Github Actions job result
          to: vera_tarzyan@mail.ru
          from: Github Actions (find-ship)
          body: 'Worflow "${{ github.workflow }}" of "${{ github.repository }}" has finished with status "${{ needs.docker.result }}".'
  
```

**Прохождение пайплайнов**
<img width="1400" alt="image" src="https://github.com/user-attachments/assets/d5fde486-c436-4511-80ad-05880bfbe222">

**Публикация образа на DockerHub**
<img width="1437" alt="image" src="https://github.com/user-attachments/assets/43472fc7-8878-4a62-8fc5-d161ff012a3f">

**Сообщение на почту**
![telegram-cloud-photo-size-2-5190702839368902686-y](https://github.com/user-attachments/assets/0da49669-09e7-4450-938e-3af1ebc34dbe)

В качестве метода ветвления был выбран Central Workflow, так как проект небольшой и разрабатывался одним человеком. Усложнение методологии в данном случае не приносит большой пользы, а вопрос контроля над стабильностью основной ветки как раз решён внедрением CI/CD.  
Данный пайплайн следует дополнить автоматическим тестированием и развёртыванием приложения (в случае этого проекта на gh-pages).


Выводы: в ходе выполнения практической работы была выбрана схема ветвления проекта Trunk, а также платформа для реализации пайплайна GitHub Actions.  
Был написан пайплайн, который при изменении ветки master реализует:
- Проверку кода линтером
- Сборку и публикацию docker-образа в DockerHub
- Отправку уведомления об успешном завершении пайплайна на электронную почту



