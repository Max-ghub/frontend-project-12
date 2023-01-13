export default {
  translation: {
    nav: {
      logout: 'Выйти',
    },
    authPage: {
      title: 'Войти',
      fields: {
        name: 'Ваш ник',
        password: 'Пароль',
      },
      submit: 'Войти',
      footer: {
        text: 'Нет аккаунта?',
        anchor: 'Регистрация',
      },
      errors: {
        auth: 'Неверные имя пользователя или пароль',
      },
    },
    signUpPage: {
      title: 'Регистрация',
      fields: {
        name: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
      },
      submit: 'Зарегистрироваться',
      errors: {
        required: 'Обязательное поле',
        usernameLength: 'От {{min}} до {{max}} символов',
        passwordLength: 'Не менее {{min}} символов',
        oneOf: 'Пароли должны совпадать',
        existedUser: 'Такой пользователь уже существует',
      },
    },
    chatPage: {
      channelsPanel: {
        title: 'Каналы',
        dropdown: {
          span: 'Управление каналом',
          remove: 'Удалить',
          rename: 'Переименовать',
        },
      },
      body: {
        title: {
          messages: 'сообщений',
        },
        fieldPH: 'Введите сообщение...',
      },
    },
    modals: {
      add: {
        title: 'Добавить канал',
        confirm: 'Отправить',
        concel: 'Отменить',
      },
      remove: {
        title: 'Удалить канал',
        body: 'Уверены?',
        confirm: 'Удалить',
        concel: 'Отменить',
      },
      rename: {
        title: 'Переименовать канал',
        confirm: 'Отправить',
        concel: 'Отменить',
      },
      errors: {
        required: 'Обязательное поле',
        channelLength: 'От {{min}} до {{max}} символов',
        existedChannel: 'Должно быть уникальным',
      },
    },
    toast: {
      add: 'Канал создан',
      remove: 'Канал удалён',
      rename: 'Канал переименован',
    },
  },
};
