import React, { useContext } from 'react'
import classnames from 'classnames'


import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded'
import { Button } from '@material-ui/core'


import { Context } from '../context'
import styles from './ThemeChanger.module.css'


const ThemeChanger = () => {
    const { darkTheme, changeThemeOrLanguage, setSelected } = useContext(Context)

    const openModal = (e) => {
        changeThemeOrLanguage()
        const target = e.target.id
        console.log(target)
        setSelected(target)
      }

    return (
        <div className = { styles.mode__container }>
            <div className = { styles.mode }>
                <Button className = 
                    { classnames ({
                        [styles.mode__icon]: true,
                        [styles.selected__mode]: darkTheme
                    }) } 
                    onClick = {openModal}
                    id='theme'
                >
                    <Brightness4RoundedIcon id='theme' />
                </Button>
            </div>
        </div>
    )
}

export default ThemeChanger