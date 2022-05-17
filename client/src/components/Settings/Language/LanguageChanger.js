import React, { useContext } from "react";
import classnames from 'classnames';


import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded'
import { Button } from "@material-ui/core";


import { Context } from '../context'
import styles from './LanguageChanger.module.css'


const LanguageChanger = () => {
    const { changeThemeOrLanguage, setSelected } = useContext(Context)

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
                        [styles.selected__mode]: false
                    }) } 
                    onClick = {openModal}
                    id='lang'
                >
                    <LanguageRoundedIcon id='lang' />
                </Button>
            </div>
        </div>
    )
}

export default LanguageChanger;