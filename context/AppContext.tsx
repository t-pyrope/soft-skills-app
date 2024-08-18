import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import {
    deleteValueFromSecureStore,
    getValueFromSecureStore,
    saveToSecureStore,
} from '@/helpers/secure-store';
import { deleteValueFromAsyncStore, saveToAsyncStore } from '@/helpers/async-store';
import { API } from '@/constants/API';
import { DoneTask } from '@/types';

type AppContextType = {
    token: string;
    displayName: string;
    email: string;
    doneTasks: DoneTask[];
    logoutLocally: () => void;
    loginLocally: (token: string, email: string, displayName: string) => void;
    setDoneTasks: Dispatch<SetStateAction<DoneTask[]>>;
};

const initialContext: AppContextType = {
    token: '',
    displayName: '',
    email: '',
    doneTasks: [],
    logoutLocally: () => {},
    loginLocally: () => {},
    setDoneTasks: () => {},
};

const AppContext = createContext(initialContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState('');
    const [displayName, setDisplayName] = useState('Red bunny');
    const [email, setEmail] = useState('');
    const [doneTasks, setDoneTasks] = useState<DoneTask[]>([])

    const setValues = async () => {
        try {
            const tokenValue = await getValueFromSecureStore('token');

            if (!tokenValue) {
                return;
            }

            const meResponse = await fetch(`${API}/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            const meJSON = await meResponse.json();

            if ('email' in meJSON && 'displayName' in meJSON) {
                setToken(tokenValue);
                setEmail(meJSON.email);
                setDisplayName(meJSON.displayName);
                setDoneTasks(meJSON.doneTasks);
            } else {
                await deleteValueFromSecureStore('token');
                await deleteValueFromAsyncStore('email');
                await deleteValueFromAsyncStore('displayName');
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setValues();
    }, []);

    const logoutLocally = useCallback(async () => {
        setToken('');
        setEmail('');
        setDisplayName('Red bunny');

        await deleteValueFromSecureStore('token');
        await deleteValueFromAsyncStore('email');
        await deleteValueFromAsyncStore('displayName');
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
    }, []);

    return (
        <AppContext.Provider
            value={{
                token,
                displayName,
                email,
                logoutLocally,
                loginLocally,
                doneTasks,
                setDoneTasks,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
