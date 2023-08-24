import Registration from "../components/Registration";
import MainBoard from "../components/MainBoard";


export const PATH_REGISTRATION = "/registration"
export const PATH_GENERAL= "/"
export const PATH_DASHBOARD= "/dashboard"
export const PATH_PROFILE= "/profile"
export const PATH_TABLE= "/table"



export const routes = [
    {path: PATH_REGISTRATION, element:<Registration/>},
    {path: PATH_GENERAL, element:<Registration/>},
    {path: PATH_DASHBOARD, element:<MainBoard/>},
    {path: PATH_PROFILE, element:<MainBoard/>},
    {path: PATH_TABLE, element:<MainBoard/>},
]
