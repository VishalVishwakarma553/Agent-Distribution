import { createContext, useState } from "react";

export const AppStore = createContext()

const AppStoreWrapper = ({children}) => {
    const [user, setUser] = useState(null)
    return (
        <AppStore.Provider value={{
            user: user,
            setUser: setUser
        }}>
            {children}
        </AppStore.Provider>
    )
}
export default AppStoreWrapper