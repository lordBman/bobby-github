import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { useAuthContext } from "../context/auth";
import { Logout } from ".";
import "../assets/css/sidebar.scss";

const Sidebar = () => {
	const { authUser } = useAuthContext();

	return (
		<aside className='siderbar'>
			<nav className='siderbar-container'>
				<Link to='/' style={{ display: "flex", justifyContent: "center" }}>
					<img style={{  height: "2rem" }} src='/images/github.svg' alt='Github Logo' />
				</Link>

				<Link to='/' className='siderbar-item'>
					<IoHomeSharp size={20} />
				</Link>

				{authUser && (
					<Link to='/likes' className='siderbar-item'>
						<FaHeart size={22} />
					</Link>
				)}

				{authUser && (
					<Link to='/explore' className='siderbar-item'>
						<MdOutlineExplore size={25} />
					</Link>
				)}

				{!authUser && (
					<Link to='/login' className='siderbar-item'>
						<PiSignInBold size={25} />
					</Link>
				)}

				{!authUser && (
					<Link to='/signup' className='siderbar-item'>
						<MdEditDocument size={25} />
					</Link>
				)}

				{authUser && (
					<div className='siderbar-logout'>
                        <Logout />
					</div>
				)}
			</nav>
		</aside>
	);
};

export default Sidebar;