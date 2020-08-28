import React, { useState } from 'react';

export const StoreContext = React.createContext(null);
export default function StoreProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const [balance, setBalance] = useState();
    const [privateKey, setPrivateKey] = useState();
    
    const store = {
        loggedIn,
        setLoggedIn,
        walletAddress,
        setWalletAddress,
        balance,
        setBalance,
        privateKey,
        setPrivateKey
    };
    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    )
}