import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { listWatchList } from "../features/watchlist/watchList";

export const UserContext = createContext(null)

export function UserProvider({children}){
    const [loggedInUser,setLoggedInUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [watchList, setWatchList] = useState([])

    useEffect(()=>{
        const getSession = async()=>{
            try{
                const userSession = await account.getSession({sessionId:'current'}).catch(()=> null)
                const user = await account.get().catch(()=> null)
            
                if(userSession && user){
                    console.log("user is signed in")
                    setLoggedInUser(user)
                    
                    const watchList = await listWatchList(user)
                    setWatchList(watchList)
                }else{
                    console.log('No active user')
                }
            }catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        getSession()
    },[])

    const value = {loggedInUser,setLoggedInUser, loading,watchList, setWatchList}

    return(
        <UserContext value={value}>
        {children}
        </UserContext>
    )
}