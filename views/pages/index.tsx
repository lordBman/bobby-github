import { Routes, Route, Navigate } from "react-router-dom";
import ExplorePage from "./explore";
import HomePage from "./home";
import LikesPage from "./likes";
import LoginPage from "./login";
import SignUpPage from "./signup";
import { useAuthContext } from "../context/auth";

const Pages = () =>{
    const { authUser, loading } = useAuthContext();
	console.log("Authenticated user:", authUser);

    if(loading){
        return (
            <div>Loading</div>
        );
    }
    
    return (
        <Routes>
            <Route index path='/' element={<HomePage />} />
            <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
            <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
            <Route path='/explore' element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />} />
            <Route path='/likes' element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} />
        </Routes>
    );
}

export default Pages;