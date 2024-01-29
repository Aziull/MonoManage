import React from 'react'
import secureStoreService from '../services/secureStoreService';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [state, dispatch]: [{userToken: string | null, isLoading: boolean, isSignout: boolean }, any] = React.useReducer(
        (prevState: any, action: { type: any; token?: any; }) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken: string | null;

            try {
                userToken = await secureStoreService.getAuthToken();                
            } catch (e) {
                dispatch({ type: 'SIGN_OUT' })
                return;
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);


    const authContext = React.useMemo(
        () => ({
            signIn: async (data: string) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                await secureStoreService.saveAuthToken(data);
                dispatch({ type: 'SIGN_IN', token: data });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            isAuth: state.userToken !== null && state.userToken?.length !== 0,
            isLoading: state.isLoading
        }),
        [state.userToken, state.isLoading]
    );
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a IgnoredAuthProvider');
    }
    return context;
};
