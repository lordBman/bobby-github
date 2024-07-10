import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../utils";

export type AuthContextProviderType = {
    loading: boolean,
    authUser: any,
    setAuthUser: React.Dispatch<any>,
	logout: CallableFunction
}

export const AuthContext = createContext<AuthContextProviderType| undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext) as AuthContextProviderType;
};

export const AuthContextProvider:  React.FC<React.PropsWithChildren> = ({ children }) => {
	const [authUser, setAuthUser] = useState<any>(null);

	const checkUserLoggedInQuery = useQuery({
		queryKey: ["user"],
		queryFn: () => axiosInstance.get("/api/auth/check"),
		onSettled: (data, error) =>{
			if(error){
				toast.error((error  as any).message);
			}
			setAuthUser(data ? data.data.user : undefined); // null or authenticated user object
		},
	});

	const logoutMutation = useMutation({
		mutationKey: ["user"],
		mutationFn: ()=> axiosInstance.get("/api/auth/logout"),
		onSuccess() {
			setAuthUser(null);
		},
		onError(error) {
			toast.error((error as any).message);
		},
	})

	const logout = async () => logoutMutation.mutate();

	return <AuthContext.Provider value={{ authUser, setAuthUser, loading: checkUserLoggedInQuery.isLoading, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;