import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/auth";
import "../assets/css/logout.scss";
// TODO Implement Logout functionality

const Logout = () => {
	const { authUser, logout } = useAuthContext();


	const handleLogout = () => logout();

	return (
		<>
			<img src={authUser?.avatarUrl} className='logout-img' />
			<div className='logout-button' onClick={handleLogout}>
				<MdLogout size={22} />
			</div>
		</>
	);
};

export default Logout;
