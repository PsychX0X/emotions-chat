import React, {useState, useContext} from 'react';
import {addMessage} from "../../firebase";
import {AuthContext} from "../../App";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {COLORS} from "../../consts";

const MessageSendingArea = () => {
    const {user} = useContext(AuthContext);

    const [textMessage, setTextMessage] = useState("");
    const handleSendMessage = async () => {
        if (!!textMessage) {
            // we should not wait of adding the message
            addMessage(user.uid, textMessage);
            setTextMessage("");
        }
    };

    return (
        <Stack sx={{ width: "100%" }} direction={"row"} spacing={1}>
            <TextField
                fullWidth
                sx={{borderRadius: 4}}
                value={textMessage}
                onChange={e => setTextMessage(e.target.value)}
            />
            <Button
                variant={"contained"}
                color={"success"}
                sx={{
                    bgcolor: "rgb(110,225,42)",
                    opacity: .7,
                    width: 50,
                    height: "calc(100% - 1px)",
                    "&:hover": {
                        bgcolor: "rgb(110,225,42)",
                        opacity: 1,
                    }
                }}
                onClick={handleSendMessage}
            >
                <SendRoundedIcon sx={{ color: COLORS.BACKGROUND.MAIN }} />
            </Button>
        </Stack>
    );
};

export default MessageSendingArea;
