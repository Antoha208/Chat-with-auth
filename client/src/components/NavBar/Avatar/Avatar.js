import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';

import ProfileData from '../../Profile/ProfileData';
import useStyles from './makeStyles.js'
import StyledBadge from './withStyles.js';
import avatar from '../../Profile/img/avatar.jpg';


const AvatarComponent = () => {
    const [isAvatar, setIsAvatar] = useState(true)
    const classes = useStyles();

    const username = useSelector(state => state.user.user.username)   

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
            children: `${username.split(' ')[0][0]}${username.split(' ')[1][0]}`,
        };
    }

    return (
        <Stack direction="row" spacing={2}>
            {isAvatar 
            ?
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar src = {avatar} className={classes.small} />
                </StyledBadge>
            :
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar {...stringAvatar(`${username}`)} />
                </StyledBadge>
            }
        </Stack>
    );
}

export default AvatarComponent