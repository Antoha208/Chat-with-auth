export const catchError = (error, states, t) => {
    if (error.response.data) {
        switch (error.response.data.message) {
            case `Пользователь с логином ${states.username} не зарегистрирован`:
                alert(`${t ('description.BackendErrorAuth1')}`)
                break;
            case 'Пароль введен неверно!':
                alert(`${t ('description.BackendErrorAuth2')}`)
                break;
            case 'Данный аккаунт уже авторизован с другого устройства!':
                alert(`${t ('description.BackendErrorAuth3')}`)
                break;
            case 'Ошибка! Убедитесь в том, что поле Username не пустое, содержит два слова, пароль содержит от 6и до 12и символов':
                alert(`${t ('description.BackendErrorAuth4')}`)
                break;
            case 'Данный пользователь уже зарегистрирован':
                alert(`${t ('description.BackendErrorAuth5')}`)
                break;
            default:
                break;
        }
    } else {
        alert(`${t ('description.BackendErrorAuth6')}`)
    }
  }