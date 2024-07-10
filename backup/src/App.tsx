import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/auth";
import { ExplorePage, HomePage, LikesPage, LoginPage, SignUpPage } from "./pages";
import { Sidebar } from "./components";

const App = () =>{
    const { authUser, loading } = useAuthContext();
	console.log("Authenticated user:", authUser);

	if (loading) return null;

	return (
		<div className='flex'>
			<Sidebar />
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route index path='/' element={<HomePage />} />
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
					<Route path='/explore' element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />} />
					<Route path='/likes' element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} />
				</Routes>
				<Toaster />
			</div>
		</div>
	);
}

export default App;