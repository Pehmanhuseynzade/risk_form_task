import Adminroot from "../Pages/Admin/Adminroot";
import DetailPage from "../Pages/Admin/Detailpage";
import Tablepage from "../Pages/Admin/Tabelpage";
import Mainuser from "../Pages/User/Mainuser";
import Userroot from "../Pages/User/Userroot";


export const ROUTES = [
    {
        path:'/',
        element:<Userroot/>,
        children:[
            {
                path:'/',
                element:<Mainuser/>
            }
        ]
    },
    {
        path:'/admin',
        element:<Adminroot/>,
        children:[
            {
                path:'',
                element:<Tablepage/>
            },
            {
                path:'details/:id',
                element:<DetailPage/>
            }
        ]
    }
]