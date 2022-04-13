import React from 'react';
import { useSelector } from "react-redux";
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';


const AvatarComponent = () => {

    //const username = useSelector(state => state.user.user)   

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

    function stringAvatar(name) {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar('Anton Androsyuk')} />
        </Stack>
    );
}

export default AvatarComponent