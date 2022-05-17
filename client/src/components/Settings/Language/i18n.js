import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          description: {
            AdminUsername: 'Username: ',
            AdminShowUsersText: 'Show all users: ',
            AdminShowUsersButton: 'Show users',
            AdminHideUsers: 'Hide users',
            AdminUsersSearch: 'Search',
            AdminUsersListId: 'ID: ',
            AdminUsersListRoles: 'ROLES: ',
            AdminUsersListAvatar: 'AVATAR: ',
            AdminUsersListLoginTime: 'LOGIN TIME: ',
            AdminUsersListTokenExp: 'TOKEN EXP.: ',
            AdminUsersListStatus: 'STATUS: OFFLINE',
            AdminUsersListRegistration: 'REGISTRATION: ',
            AdminUsersListDeleteAll: 'Delete all',
            AdminUsersListDelete: 'Delete user',
            AuthSignInCaps: 'SIGN IN',
            AuthSignUpAccountCaps: 'SIGH UP',
            AuthNeedAccount: 'Need an account?',
            AuthSignUpAccount: 'Sign up!',
            AuthHasAccount: 'Have an account?',
            AuthSignIn: 'Sign in!',
            ChatListSearch: 'Search',
            ChatWindowInput: 'Type a message...',
            SelectCompanionSearch: 'Search',
            NavBarChats: 'Chats',
            NavBarProfile: 'Profile',
            NavBarSettings: 'Settings',
            NavBarLogout: 'Log out',
            NavBarAdmin: 'Admin Pannel',
            ProfileUsername: 'Username: ', 
            ProfileAbout: 'About:',
            ProfileAddAbout: ' ...' ,
            ProfileRoles: 'My roles:', 
            ProfileAccess: 'Access exp. time: ', 
            ProfileLastLogin: 'Last login: ',
            ProfileDeleteAcc: 'Delete account',
            SettingsUsername: 'Username: ', 
            SettingsPassword: 'Change my password', 
            SettingsTheme: 'Theme', 
            SettingsLanguage: 'Language', 
            SettingsShortcuts: 'Keyboard shortcuts', 
            AcceptModalTitle: 'Confirmation',
            AcceptModalText: 'Are you sure?',
            AcceptModalAccept: 'Accept',
            PasswordModalTitle: 'Edit my password',
            PasswordModalPassword: 'Password',
            PasswordModalConfirmPassword: 'Conrirm password',
            PasswordModalAccept: 'Accept',
            ShortcutsModalTitle: 'Commands',
            ShortcutsModalArrows: 'Arrows',
            ShortcutsModalNavigation: 'Navigation',
            ShortcutsModalSendMessage: 'Send',
            ShortcutsModalStepBack: 'Step Back',
            SimpleModalTitle: 'Password check',
            SimpleModalPassword: 'Password',
            SimpleModalAccept: 'Accept',
            UsernameModalTitle: 'Edit username',
            UsernameModalNewUsername: 'New username',
            UsernameModalAccept: 'Accept'
          }
        }  
      },
      ru: {
        translation: {
          description: {
            AdminUsername: 'Никнейм: ',
            AdminShowUsersText: 'Пользователи: ',
            AdminShowUsersButton: 'Показать всех',
            AdminHideUsers: 'Закрыть',
            AdminUsersSearch: 'Поиск',
            AdminUsersListId: 'ID: ',
            AdminUsersListRoles: 'РОЛИ: ',
            AdminUsersListAvatar: 'АВАТАР: ',
            AdminUsersListLoginTime: 'ВРЕМЯ ЛОГИНА: ',
            AdminUsersListTokenExp: 'ТОКЕН ДО: ',
            AdminUsersListStatus: 'СТАТУС: НЕ В СЕТИ',
            AdminUsersListRegistration: 'РЕГИСТРАЦИЯ: ',
            AdminUsersListDeleteAll: 'Удалить всех',
            AdminUsersListDelete: 'Удалить',
            AuthSignInCaps: 'АВТОРИЗАЦИЯ',
            AuthSignUpAccountCaps: 'РЕГИСТРАЦИЯ',
            AuthNeedAccount: 'Нет аккаунта?',
            AuthSignUpAccount: 'Зарегистрироваться!',
            AuthHasAccount: 'Уже есть аккаунт?',
            AuthSignIn: 'Войти!',
            ChatListSearch: 'Поиск',
            ChatWindowInput: 'Наберите текст...',
            SelectCompanionSearch: 'Поиск',
            NavBarChats: 'Чаты',
            NavBarProfile: 'Профиль',
            NavBarSettings: 'Настройки',
            NavBarLogout: 'Выйти',
            NavBarAdmin: 'Админ',
            ProfileUsername: 'Никнейм: ', 
            ProfileAbout: 'О себе: ',
            ProfileAddAbout: ' ...' , 
            ProfileRoles: 'Мои роли:', 
            ProfileAccess: 'Доступ закончиться: ',
            ProfileLastLogin: 'Последний логин: ',
            ProfileDeleteAcc: 'Удалить аккаунт',
            SettingsUsername: 'Никнейм:', 
            SettingsPassword: 'Изменить пароль', 
            SettingsTheme: 'Тема', 
            SettingsLanguage: 'Язык', 
            SettingsShortcuts: 'Упр. с клавиатуры', 
            AcceptModalTitle: 'Подтверждение',
            AcceptModalText: 'Вы уверены?',
            AcceptModalAccept: 'Принять',
            PasswordModalTitle: 'Изменение пароля',
            PasswordModalPassword: 'Пароль',
            PasswordModalConfirmPassword: 'Подтвердите',
            PasswordModalAccept: 'Принять',
            ShortcutsModalTitle: 'Команды',
            ShortcutsModalArrows: 'Стрелы',
            ShortcutsModalNavigation: 'Навигация',
            ShortcutsModalSendMessage: 'Отправить',
            ShortcutsModalStepBack: 'Шаг назад',
            SimpleModalTitle: 'Введите пароль',
            SimpleModalPassword: 'Пароль',
            SimpleModalAccept: 'Принять',
            UsernameModalTitle: 'Изменить ник',
            UsernameModalNewUsername: 'Новый ник',
            UsernameModalAccept: 'Принять'
          }
        }  
      } 
    }
  });

export default i18n