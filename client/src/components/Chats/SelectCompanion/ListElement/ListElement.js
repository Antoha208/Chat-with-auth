import React from 'react'
import { useTranslation } from 'react-i18next'


import Tooltip from '@mui/material/Tooltip'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Stack from '@mui/material/Stack'


import StyledBadge from '../../../NavBar/AvatarComponent/withStyles.js'
import stylesJS from './makeStyles.js'
import useClasses from '../../../../CustomHooks/useClasses.js'
import styles from './ListElement.module.css'
import AvatarComp from './AvatarComp/AvatarComp.js'

const ListElement = ({user}) => {
    const classes = useClasses(stylesJS)
    const { t } = useTranslation()

    return (
        <ListItem className={classes.listItem} style={{alignItems: 'flex-start'}}>
            <Tooltip title={t ('description.AdminUsersCheckBoxTooltip')} arrow>
                <div className = {styles.user__basicInfo}>
                    <ListItemAvatar>
                        {user.iat === 0 ?
                            <AvatarComp 
                                user={user}
                            />
                        :
                            <Stack direction="row" spacing={2}>        
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <AvatarComp 
                                        user={user}
                                    />
                                </StyledBadge>
                            </Stack>
                        }
                    </ListItemAvatar>
                    <ListItemText>{user.username}</ListItemText>
                </div>
            </Tooltip>
        </ListItem>
    )
}

export default ListElement
