import { createContext, useState } from "react";

export const AppStore = createContext()

const AppStoreWrapper = ({children}) => {
    const [allAgentLoading, setAllAgentLoading] = useState(true)
    const [user, setUser] = useState("")
    const [agent, setAgent] = useState([])
    return (
        <AppStore.Provider value={{
            user: user,
            setUser: setUser,
            agent,
            setAgent,
            allAgentLoading,
            setAllAgentLoading
        }}>
            {children}
        </AppStore.Provider>
    )
}
export default AppStoreWrapper