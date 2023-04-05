import React, {useContext, useEffect} from 'react';
import {AuthContext, InterlocutorContext} from "../../App";
import {getInterlocutorId} from "../../firebase";
import SignedIn from "./SignedIn";
import NotSignedIn from "./NotSignedIn";

const Auth = () => {
    const {user} = useContext(AuthContext);
    const {setInterlocutorUid} = useContext(InterlocutorContext);

    useEffect(() => {
        const fetchInterlocutorId = async () => {
            if (user) {
                const iId = await getInterlocutorId(user.uid);
                setInterlocutorUid(iId);
            }
        };
        fetchInterlocutorId();
    }, [user]);

    return (
        <div>
            {user ? <SignedIn />: <NotSignedIn />}
        </div>
    );
};

export default Auth;
