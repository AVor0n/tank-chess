# Работа с проектом

## Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


## Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


## Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)
Для тестирования UI используется cypress [`cypress`](https://www.cypress.io/)

```yarn test```

```yarn cypress:test```

## Линтинг

```yarn lint```

## Форматирование prettier

```yarn format```

## Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify`

## Переменные окружения ENV

При запуске контейнеров рядом с docker-compose.yml должен лежать файл с переменными окружения .env


## Управление Docker

`docker-compose up`  – запуск всех контейеров
`docker-compose up server`  – запуск контейнера server
`docker-compose up server --build`  – пересборка контейнера server
`docker-compose ps --services`  – посмотреть запущенные контейнеры
`docker-compose stop`  – остановка всех контейнеров
`docker-compose up -d --no-deps --build`  – пересборка всех контейнеров

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`


