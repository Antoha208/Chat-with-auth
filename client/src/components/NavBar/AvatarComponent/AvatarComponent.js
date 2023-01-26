import React from 'react'
import { useSelector } from 'react-redux'


import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'


import stylesJS from './makeStyles.js'
import useClasses from '../../../CustomHooks/useClasses.js'
import StyledBadge from './withStyles.js'


const AvatarComponent = () => {
    const classes = useClasses(stylesJS)

    const userStore = useSelector(state => state.user.user)

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(username) {
        return {
            sx: {
            bgcolor: stringToColor(username),
            },
            children: `${userStore.username.split(' ')[0][0]}${userStore.username.split(' ')[1][0]}`,
        };
    }

    return (
        <Stack direction="row" spacing={2}>        
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                {userStore.avatar === '' || undefined || null ? 
                    <Avatar className={classes.small} {...stringAvatar(`${userStore.username}`)} />
                :
                    <Avatar className={classes.small} src={`${process.env.REACT_APP_URL_API}` + userStore.avatar} />
                }
            </StyledBadge>
        </Stack>
    )
}

export default AvatarComponent
