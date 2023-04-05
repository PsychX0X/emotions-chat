import React, {useContext} from 'react';
import {authUser} from "../../firebase";
import {AuthContext} from "../../App";
import {Button} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const NotSignedIn = () => {
    const {setUser} = useContext(AuthContext);

    const handleAuth = async () => {
        const u = await authUser();
        setUser(u);
    }

    return (
        <div>
            <Button variant={"contained"} onClick={handleAuth}>
                <GoogleIcon fontSize={"large"}/>
            </Button>
        </div>
    );
};

export default NotSignedIn;
