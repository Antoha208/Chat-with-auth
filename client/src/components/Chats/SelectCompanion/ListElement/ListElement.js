import React from 'react'
import { useTranslation } from 'react-i18next'


import Tooltip from '@material-ui/core/Tooltip'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { Stack } from '@mui/material'


import StyledBadge from '../../../NavBar/AvatarComponent/withStyles'
import useStyles from './makeStyles'
import styles from './ListElement.module.css'
import AvatarComp from './AvatarComp/AvatarComp'

const ListElement = ({user}) => {
    const classes = useStyles()
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
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}
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