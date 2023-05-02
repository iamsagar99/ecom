import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { MenuComponent } from "../../component/front/nav.component"
import { syncLocalCart } from "../../reducers/cart.reducer";

const HomeLayout = () =>{
    let dispatch = useDispatch();
    dispatch(syncLocalCart());
    return (
        <>
            <MenuComponent/>
            <Outlet/>
        </>
    )
}
export default HomeLayout;