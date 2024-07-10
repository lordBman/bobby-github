import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/auth";
import type { UserProfile } from "../types";
import { useMutation } from "react-query";
import { axiosInstance } from "../utils";


export interface LikeProfileProps{
    userProfile: UserProfile 
}

const LikeProfile: React.FC<LikeProfileProps> = ({ userProfile }) => {
	const { authUser } = useAuthContext();

	const isOwnProfile = authUser?.username === userProfile.login;

	const handleLikeProfileMutation = useMutation({
		mutationKey: ["like"],
		mutationFn: () => axiosInstance.post(`/api/users/like/${userProfile.login}`),
		onSuccess(data, variables, context) {
			toast.success(data.data.message);
		},
		onError(error, variables, context) {
			toast.error((error as any).message);
		},
	});

	const handleLikeProfile = async () => handleLikeProfileMutation.mutate();

	if (!authUser || isOwnProfile) return null;

	return (
		<button className='profile-info-like-button' onClick={handleLikeProfile}>
			<FaHeart size={16} /> Like Profile
		</button>
	);
};

export default LikeProfile;
