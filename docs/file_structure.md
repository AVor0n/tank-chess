# Файловая структура

Проект организован в виде монорепозитория. [Работа с монорепой](./get_started.md)

## Root
```
root
┣━ 🗀 docs      // документация проекта
┗━ 🗁 packages
   ┣━ 🗀 client // фронтенд
   ┗━ 🗀 server // бэкенд
```

## Client
```
client/src
┣━ 🗁 assets
┃  ┣━ 🗀 fonts      // шрифты
┃  ┣━ 🗀 images     // картинки
┃  ┗━ 🗀 styles     // глобальные стили
┃
┣━ 🗀 components    // общие компоненты приложения
┃
┣━ 🗀 pages         // страницы приложения
┃
┣━ ...
┃
┣━ utils.ts         // глобальные утилсы проекта
┗━ constants.ts     // глобальные константы проекта
```


### components
Папка с общими компонентами проекта. Каждый компонент имеет типичную структуру
```
🗁 components
┣━ 🗁 EditWindow     // папка компонента, название в PascalCase
┃  ┣━ 🗁 components  // у каждого компонента могут быть свои, только ему нужные компоненты
┃  ┃  ┣━ 🗁 Header
┃  ┃  ┃  ┣━ Header.module
┃  ┃  ┃  ┣━ Header.module.scss
┃  ┃  ┃  ┗━ index.ts
┃  ┃  ┗━ 🗀 Footer
┃  ┃
┃  ┣━ EditWindow.tsx           // код компонента
┃  ┣━ EditWindow.module.scss    // стили компонента
┃  ┣━ EditWindow.test.tsx      // тесты компонента
┃  ┣━ constants.ts             // константы
┃  ┣━ utils.ts                 // утилиты
┃  ┣━ types.ts                 // типы
┃  ┗━ index.ts                 // экспорт компонента `export * from './EditWindow.tsx`
┃
┣━ 🗁 Button
┗━ 🗁 Link
```

### pages
Страницы приложения. Повторяют структуру `components`
```
🗁 pages
┣━ 🗁 MainPage
┃  ┣━ 🗁 components // компоненты необходимые только на странице `MainPage`
┃  ┃  ┣━ 🗁 SideBar
┃  ┃  ┃  ┣━ SideBar.tsx
┃  ┃  ┃  ┣━ SideBar.module.scss
┃  ┃  ┃  ┗━ index.ts
┃  ┃  ┣━ 🗀 ...
┃  ┃  ┗━ 🗀 Header
┃  ┃
┃  ┣━ MainPage.tsx
┃  ┣━ MainPage.module.scss
┃  ┣━ constants.ts
┃  ┣━ utils.ts
┃  ┣━ types.ts
┃  ┗━ index.ts
┃
┣━ 🗀 ForumPage
┗━ 🗀 GamePage
```
