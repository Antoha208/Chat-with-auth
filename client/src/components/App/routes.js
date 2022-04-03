import { LOGIN_ROUTE,
         REGISTRATION_ROUTE,
         ADMIN_ROUTE, 
         CHATS_ROUTE, 
         ONECHAT_ROUTE, 
         PROFILE_ROUTE, 
         SETTINGS_ROUTE } from '../../utils/consts'

import Admin from '../../pages/Admin/Admin'
import Chats from '../../pages/Chats/Chats'
import OneChat from '../../pages/OneChat/OneChat'
import Profile from '../../pages/Profile/Profile'
import Settings from '../../pages/Settings/Settings'
import Auth from '../../pages/Auth/Auth'


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