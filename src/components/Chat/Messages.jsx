import React, {useEffect, useRef} from 'react';
import {Stack} from "@mui/material";
import Message from "./Message";

const Messages = ({messages}) => {
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [bottomRef, messages]);

    return (
        <Stack
            sx={{
                display: "flex",
                height: "100%",
                overflowY: "auto",
                padding: 1,
            }}
            spacing={1}
        >
            {messages.map(msg => <Message key={msg.text} message={msg}/>)}
            <div ref={bottomRef}/>
        </Stack>
    );
};

export default Messages;
