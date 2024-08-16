import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {deleteValueFromSecureStore, getValueFromSecureStore, saveToSecureStore} from "@/helpers/secure-store";
import {deleteValueFromAsyncStore, saveToAsyncStore} from "@/helpers/async-store";
import {API} from "@/constants/API";

type AppContextType = {
    token: string,
    displayName: string,
    email: string,
    logoutLocally: () => void,
    loginLocally: (token: string, email: string, displayName: string) => void,
}

const initialContext: AppContextType = {
    token: '',
    displayName: '',
    email: '',
    logoutLocally: () => {},
    loginLocally: () => {}
}

const AppContext = createContext(initialContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState('');
    const [displayName, setDisplayName] = useState('Red bunny');
    const [email, setEmail] = useState('');

    const setValues = async () => {
        try {
            const tokenValue = await getValueFromSecureStore('token');

            if (!tokenValue) {
                return;
            }

            const meResponse = await fetch(`${API}/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenValue}`
                }
            })

            const meJSON = await meResponse.json();

            if ('email' in meJSON && 'displayName' in meJSON) {
                setToken(tokenValue);
                setEmail(meJSON.email);
                setDisplayName(meJSON.displayName);
            } else {
                await deleteValueFromSecureStore('token');
                await deleteValueFromAsyncStore('email');
                await deleteValueFromAsyncStore('displayName');
            }

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setValues();
    }, [])

    const logoutLocally = useCallback(async () => {
        setToken('');
        setEmail('');
        setDisplayName('Red bunny');
    }, []);

    const loginLocally = useCallback(async (token: string, email: string, displayName: string) => {
        try {
            setToken(token);
            setDisplayName(displayName);
            setEmail(email);

            await saveToSecureStore('token', token);
            await saveToAsyncStore('email', email);
            await saveToAsyncStore('displayName', displayName);
        } catch (e) {
            console.error(e);
        }
    }, [])

    return (
        <AppContext.Provider value={{
            token,
            displayName,
            email,
            logoutLocally,
            loginLocally,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
