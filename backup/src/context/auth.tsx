import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export type AuthContextProviderType = {
    loading: boolean,
    authUser: any,
    setAuthUser: React.Dispatch<any>
}

export const AuthContext = createContext<AuthContextProviderType| undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext) as AuthContextProviderType;
};

export const AuthContextProvider:  React.FC<React.PropsWithChildren> = ({ children }) => {
	const [authUser, setAuthUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/auth/check", { credentials: "include" });
				const data = await res.json();
				setAuthUser(data.user); // null or authenticated user object
			} catch (error) {
				toast.error((error  as any).message);
			} finally {
				setLoading(false);
			}
		};
		checkUserLoggedIn();
	}, []);

	return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;