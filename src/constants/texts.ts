export const LOCALE = 'ru-RU';

export const TEXTS = {
  login: {
    title: 'Вход',
    subtitle: 'Данные инстанса из личного кабинета GREEN-API',
    idInstanceLabel: 'idInstance',
    idInstancePlaceholder: '3100123456',
    apiTokenLabel: 'apiTokenInstance',
    apiTokenPlaceholder: 'd75b3a66374942c5b3c0...',
    apiUrlLabel: 'apiUrl (необязательно)',
    submit: 'Войти',
    submitting: 'Вход...',
  },

  loginErrors: {
    invalidIdInstance: 'idInstance должен состоять из цифр.',
    missingApiToken: 'Введите apiTokenInstance.',
    connectionFailed: (message: string) => `Не удалось подключиться: ${message}`,
    unknownState: (state: string) => `Состояние инстанса: ${state}`,
    instanceStates: {
      notAuthorized: 'Инстанс не авторизован. Отсканируйте QR-код в личном кабинете GREEN-API.',
      blocked: 'Аккаунт заблокирован.',
      starting: 'Инстанс запускается, попробуйте через минуту.',
      yellowCard: 'На аккаунте временные ограничения.',
    } as Record<string, string>,
  },

  sidebar: {
    title: 'Чаты',
    newChat: 'Новый чат',
    logout: 'Выйти',
    empty: 'Чатов пока нет',
    startChat: 'Начать новый чат',
    noMessages: 'Нет сообщений',
    ownMessagePrefix: 'Вы: ',
  },

  connection: {
    connecting: 'Подключение...',
    online: 'В сети',
    error: 'Нет соединения',
  },

  newChat: {
    phonePlaceholder: 'Номер телефона получателя',
    create: 'Создать',
    invalidPhone: 'Введите номер в международном формате, например +7 999 123-45-67',
  },

  chat: {
    back: 'Назад',
    noChatSelected: 'Выберите чат или начните новый',
    emptyHint: 'Напишите первое сообщение. Ответ появится здесь автоматически.',
    unnamedContact: 'MAX',
    inputPlaceholder: 'Сообщение',
    send: 'Отправить',
  },

  messageStatus: {
    pending: 'Отправляется',
    sent: 'Отправлено',
    failed: 'Не отправлено',
    sendError: (message: string) => `Не отправлено: ${message}`,
  },

  dates: {
    today: 'Сегодня',
    yesterday: 'Вчера',
  },
} as const;
