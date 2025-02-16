# Avito Clone

## Описание
Avito Clone – это тестовое задание для разработки приложения-клона Авито с базовыми возможностями по работе с объявлениями.

## Технические требования
- Node.js v20
- React 18+
- Vite для сборки
- React Router DOM для роутинга
- Material UI для стилизации
- TypeScript
- Redux Toolkit для управления глобальным состоянием
- React Query и Axios для работы с асинхронными HTTP-запросами
- Возможность запуска проекта в docker‑среде (Dockerfile и docker‑compose настроены опционально)
- Поддержка отмены HTTP‑запросов, валидация форм, сохранение черновика в Local Storage

## Функциональные требования
- Многошаговая форма для создания/редактирования объявлений с валидацией обязательных полей
- Список объявлений с пагинацией (максимум 5 на странице), поиском и фильтрацией
- Детальная карточка объявления с возможностью редактирования
- Заглушка для фото, если ссылка не указана
- Уведомления (Snackbar) вместо alert

## Запуск проекта

1. Установите зависимости:
   ```bash
   npm install

---

### Резюме

В приведённом решении:
- Приложение структурировано по принципу FSD с тремя слоями: app, pages, shared.
- Используются Material UI компоненты для стилизации и отображения уведомлений через Snackbar (NotificationProvider).
- Глобальное состояние управляется Redux Toolkit, а асинхронные запросы выполняются через React Query + Axios.
- Если фото объявления не указано, используется заглушка (placeholder image).
- Формы имеют многошаговую логику с валидацией, а черновик сохраняется в Local Storage.

Это – единый стиль кода, который соответствует всем техническим и функциональным требованиям. Если потребуется дополнительная доработка (например, добавление docker‑конфигураций или unit‑тестов), их можно интегрировать по аналогичной схеме.

Если есть вопросы или необходима дополнительная помощь, пишите!
