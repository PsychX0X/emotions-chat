import React, {useState} from "react";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import EmotionDetector from "./components/EmotionDetector";
import {Box} from "@mui/material";
import {COLORS} from "./consts";

export const AuthContext = React.createContext(null);
export const InterlocutorContext = React.createContext(null);

function App() {
    const [user, setUser] = useState(null);
    const [interlocutorUid, setInterlocutorUid] = useState(null);

    return (
        <>
            <AuthContext.Provider value={{user, setUser}}>
                <InterlocutorContext.Provider value={{interlocutorUid, setInterlocutorUid}}>
                    {!!user && <EmotionDetector/>}
                    <Box sx={appWrapperStyles}>
                        <Auth/>
                        {!!user && <Chat/>}
                    </Box>
                </InterlocutorContext.Provider>
            </AuthContext.Provider>
        </>
    );
}

const appWrapperStyles = {
    width: "100wh",
    height: "100vh",
    bgcolor: COLORS.BACKGROUND.SECONDARY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export default App;
