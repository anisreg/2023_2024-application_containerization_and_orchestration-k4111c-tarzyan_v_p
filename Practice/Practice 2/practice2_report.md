```
![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/ed0133c7-ce7c-4404-b71e-44fe0cce2397)```
University: [ITMO University](https://itmo.ru/ru/)
Faculty: [FICT](https://fict.itmo.ru)
Course: [Application containerization and orchestration](https://github.com/itmo-ict-faculty/application-containerization-and-orchestration)
Year: 2023/2024
Group: K4111c
Author: Tarzyan Vera Pavlovna
Practice: practice2
Date of create: 
Date of finished:
```
Задание на практику: выбрать и развернуть в minikube базу данных. Поскольку в прошлой практике мы использовали Mongo DB, то её и будем разворачивать. Для этого, установим:
- Minikube - инструмент для оркестрации контейнеров (k8s в миниатюре) на локальной машине
- консольную утилиту kubectl для более удобной работы с кластером
- Lens - IDE для удобного мониторинга Kubernetes
- Helm - менеджер пакетов для Kubernetes
1. Установка minikube и kubectl.
- Инструкция по установке minikube в официальной документации: https://minikube.sigs.k8s.io/docs/start/;
- Инструкция по установке kubectl https://minikube.sigs.k8s.io/docs/handbook/kubectl/.
  
Выполним команду `kubectl get nodes` и проверим, что он подхватил запущенную в minikube ноду.
![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/65fff6b8-c218-4143-85d4-81da9fcbb736)
2. Установка и запуск Helm
- Устанавливаем helm при помощи команды `choco install kubernetes-helm`. Убеждаемся в том, что он установлен, проверяя версию:
![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/e9768f0d-eb80-459a-a08d-58c3b1453076)
- Создаём Helm Chart при помощи команды `helm create "название пакета""`. Создаётся папка с шаблонными файлами:
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/a28219fb-e82f-4a8e-b787-82712a7a877d)
- Возьмём готовые зависимости для Mongo DB с сайта https://artifacthub.io/packages/helm/bitnami/mongodb, и добавим информацию о свежей версии в Chart.yaml. В values.yaml отключаем аутентификацию для MonboDB.
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/535918cc-7df3-4345-8d76-97e0c8661f7c)
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/30d197aa-7201-4fce-bc77-f4bce3d7a219)
- Воспользуемся командой `helm dependency update` в директории нашего чарта. Helm обновит все зависимости в соответствии с их последней версией, и скачает файлы с чартами.
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/0606019a-b014-458c-9d3e-434b4c690a98)
  ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/3dada34a-10ef-4011-8127-091bb5a95fdc)
- Запускаем Helm Chart при помощи команды `helm install "название чарта в Chart.yaml" ./ -n "название namespace"` в пространстве имён mongodb, который мы создали ранее командой `kubectl create namespace "название"`
3. Lens
  - Скачиваем Lens с официального сайта: https://k8slens.dev/. Это ПО обладает удобным интерфейсом для изучения внутренностей кластера выполнять команды в контейнере напрямую. Сразу же находим кластер minikube в каталоге.
   ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/6ebb201e-e124-4a0a-8a8f-c98c42b5c206)
  - В разделе Pods видим следующую картину: ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/56434298-7916-414d-8ea5-3c75e85579e3)
  - Пробрасываем порт контейнера на локальный компьютер: ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/28bba4d4-4ed4-40d7-96da-81bce174b173)
  - Открывается NGINX - демонстрационный образ при создании Helm чарта. ![image](https://github.com/anisreg/2023_2024-application_containerization_and_orchestration-k4111c-tarzyan_v_p/assets/148772793/2d411dfb-2f5d-4659-8f1a-5e6a9ee5b0e6)
4. Подключаемся к Mongo DB





