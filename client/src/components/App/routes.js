import { LOGIN_ROUTE,
         REGISTRATION_ROUTE,
         ADMIN_ROUTE, 
         CHATS_ROUTE, 
         ONECHAT_ROUTE, 
         PROFILE_ROUTE, 
         SETTINGS_ROUTE,
        } from '../../utils/consts.js'
import Admin from '../../pages/Admin/Admin.js'
import Chats from '../../pages/Chats/Chats.js'
import OneChat from '../../pages/OneChat/OneChat.js'
import Profile from '../../pages/Profile/Profile.js'
import Settings from '../../pages/Settings/Settings.js'
import Auth from '../../pages/Auth/Auth.js'


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

    {
        path: CHATS_ROUTE,
        Component: Chats
    },

    {
        path: ONECHAT_ROUTE + '/:id',
        Component: OneChat
    },

    {
        path: PROFILE_ROUTE,
        Component: Profile
    },

    {
        path: SETTINGS_ROUTE,
        Component: Settings
    }
]


export const allRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
