import { IoLocationOutline } from "react-icons/io5";
import { RiGitRepositoryFill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { TfiThought } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";
import { formatMemberSince } from "../utils";
import type { UserProfile } from "../types";
import { LikeProfile } from ".";
import "../assets/css/profile-info.scss";
import { useEffect, useRef, useState } from "react";

interface ProfileInfoProps{
    userProfile: UserProfile
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userProfile }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const [isSticky, setIsSticky] = useState(false);
	const [elementTop, setElementTop] = useState<number | null>(null);
	
	useEffect(() => {
		const handleScroll = () => {
		  if (elementRef.current) {
			const elementPosition = elementRef.current.getBoundingClientRect().top;
			if (elementTop === null) {
			  setElementTop(elementPosition + 20);
			}
			if (elementTop !== null) {
			  setIsSticky(window.scrollY > elementTop);
			}
		  }
		};
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, [elementTop]);

	const memberSince = formatMemberSince(userProfile.created_at);

	return (
		<div className={`profile-info-root ${isSticky ? "sticky" : "" }`} ref={elementRef}>
			<div className='profile-info-container'>
				<div className='profile-info-avatar-container'>
					{/* User Avatar */}
					<a href={userProfile?.html_url} target='_blank' rel='noreferrer'>
						<img src={userProfile?.avatar_url} className='profile-info-avatar' alt='' />
					</a>
					{/* View on Github */}

					<div className='profile-info-link-container'>
						<LikeProfile userProfile={userProfile} />
						<a href={userProfile?.html_url} target='_blank' rel='noreferrer' className='profile-info-link'>
							<FaEye size={16} /> View on Github
						</a>
					</div>
				</div>

				{/* User Bio */}
				{userProfile?.bio ? (
					<div className='profile-info-bio-container'>
						<TfiThought />
						<p className='profile-info-bio'>{userProfile?.bio.substring(0, 60)}...</p>
					</div>
				) : null}

				{/* Location */}
				{userProfile?.location ? (
					<div className='profile-info-location'>
						<IoLocationOutline /> {userProfile?.location}
					</div>
				) : null}

				{/* Twitter Username */}
				{userProfile?.twitter_username ? (
					<a href={`https://twitter.com/${userProfile.twitter_username}`} target='_blank' rel='noreferrer' className='profile-info-twitter-username'>
						<FaXTwitter /> {userProfile?.twitter_username}
					</a>
				) : null}

				{/* Member Since Date */}
				<div className='profile-info-member-container'>
					<p className='profile-info-member'>Member since</p>
					<p className=''>{memberSince}</p>
				</div>

				{/* Email Address */}
				{userProfile?.email && (
					<div className='profile-info-member-container'>
						<p className='profile-info-member'>Email address</p>
						<p className=''>{userProfile.email}</p>
					</div>
				)}

				{/* Full Name */}
				{userProfile?.name && (
					<div className='profile-info-member-container'>
						<p className='profile-info-member'>Full name</p>
						<p className=''>{userProfile?.name}</p>
					</div>
				)}

				{/* Username */}
				<div className='profile-info-member-container'>
					<p className='profile-info-member'>Username</p>
					<p className=''>{userProfile.login}</p>
				</div>
			</div>

			<div className='profile-info-stats'>
				{/* Followers Count */}
				<div className='profile-info-stats-contianer'>
					<RiUserFollowFill className='profile-info-stats-icon' />
					<p className='profile-info-stats-text'>Followers: {userProfile.followers}</p>
				</div>

				{/* Following count */}
				<div className='profile-info-stats-contianer'>
					<RiUserFollowLine className='profile-info-stats-icon' />
					<p className='profile-info-stats-text'>Following: {userProfile.following}</p>
				</div>

				{/* Number of public repos */}
				<div className='profile-info-stats-contianer'>
					<RiGitRepositoryFill className='profile-info-stats-icon' />
					<p className='profile-info-stats-text'>Public repos: {userProfile.public_repos}</p>
				</div>

				{/* Number of public gists */}
				<div className='profile-info-stats-contianer'>
					<RiGitRepositoryFill className='profile-info-stats-icon' />
					<p className='profile-info-stats-text'>Public gists: {userProfile.public_gists}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;