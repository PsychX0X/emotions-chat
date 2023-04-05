import React, {useContext} from 'react';
import {signOut} from "../../firebase";
import {AuthContext} from "../../App";
import {Box, IconButton} from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const SignedIn = () => {
    const {setUser} = useContext(AuthContext);

    const handleSignOut = async () => {
        // should not wait
        signOut();
        setUser(null);
    };

    return (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton onClick={handleSignOut}>
                <ExitToAppRoundedIcon fontSize={"large"} />
            </IconButton>
        </Box>
    );
};

export default SignedIn;
