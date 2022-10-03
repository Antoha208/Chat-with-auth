import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


import { Menu } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

const MenuComp = ({anchorEl, navigateTo}) => {
    const { t } = useTranslation()
    const auth = useSelector(state => state.isAuth)
    const userStore = useSelector(state => state.user.user)
    const open = Boolean(anchorEl)
    const checkRole = userStore.roles.includes('Admin')

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={navigateTo}
        >
            <MenuItem onClick={() => navigateTo('chats')}>{t ('description.NavBarChats')}</MenuItem>
            <MenuItem onClick={() => navigateTo('profile')}>{t ('description.NavBarProfile')}</MenuItem>
            <MenuItem onClick={() => navigateTo('settings')}>{t ('description.NavBarSettings')}</MenuItem>
            {auth.isAuth && (
                <MenuItem onClick={() => navigateTo('logout')}>{t ('description.NavBarLogout')}</MenuItem>
            )}
            {checkRole && (
                <MenuItem onClick={(e) => navigateTo('admin')}>{t ('description.NavBarAdmin')}</MenuItem>
            )}
        </Menu>
    )
}

export default MenuComp