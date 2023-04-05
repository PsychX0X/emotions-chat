import React, {useState, useEffect, useContext} from 'react';
import {subscribeInterlocutorEmotion, subscribeMessages} from "../../firebase";
import {COLORS, EMOTIONS_INFO} from "../../consts";
import {AuthContext, InterlocutorContext} from "../../App";
import {Box, Paper} from "@mui/material";
import MessageSendingArea from "./MessageSendingArea";
import Messages from "./Messages";

const Chat = () => {
    const {user} = useContext(AuthContext);
    const {interlocutorUid} = useContext(InterlocutorContext);

    const [interlocutor, setInterlocutor] = useState(null);
    useEffect(() => {
        console.log(interlocutorUid);
        if (interlocutorUid) {
            return subscribeInterlocutorEmotion(interlocutorUid, setInterlocutor);
        }
    }, [interlocutorUid]);

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (user?.uid) {
            subscribeMessages(setMessages);
        }
    }, [user?.uid]);

    return (
        <Paper
            elevation={0}
            sx={getChatPaperStyles(interlocutor)}
        >
            <Box sx={emojiStyles}>
                {!!interlocutor && EMOTIONS_INFO[interlocutor.emotion].emogi}
            </Box>
            <Messages messages={messages}/>
            <MessageSendingArea />
        </Paper>
    );
};

const getChatPaperStyles = (interlocutor) => ({
    position: "relative",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    width: 550,
    height: "80%",
    bgcolor: COLORS.BACKGROUND.MAIN,
    borderRadius: 4,
    padding: 1,
    border: "solid 4px",
    borderColor: !!interlocutor ? EMOTIONS_INFO[interlocutor.emotion]?.color : "black",
});

const emojiStyles = {
    position: "absolute",
    top: 4,
    right: 4,
    fontSize: 30,
};

export default Chat;
