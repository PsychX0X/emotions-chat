import React, {useContext} from 'react';
import {AuthContext} from "../../App";
import {Box, Typography} from "@mui/material";
import {EMOTIONS_INFO} from "../../consts";

const Message = ({message}) => {
    const {user} = useContext(AuthContext);
    const {uid, text, emotion} = message;
    const emogi = EMOTIONS_INFO[emotion]?.emogi;

    return (
        <Box
            sx={{
                position: "relative",
                maxWidth: 200,
                alignSelf: user.uid === uid ? "flex-end" : "flex-start",
                bgcolor: "#03a9f4",
                // opacity: .7,
                padding: 1,
                borderRadius: 4,
            }}
        >
            <Typography>
                {text}
            </Typography>
            <Box
                sx={{
                    position: "absolute",
                    bottom: -15,
                    right: -10,
                    margin: 1,
                }}
            >
                {emogi}
            </Box>
        </Box>
    );
};

export default Message;
