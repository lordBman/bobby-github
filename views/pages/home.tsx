import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ProfileInfo, Repos, Search, SortRepos, Spinner } from "../components";
import type { Repo, UserProfile } from "../types";
import { useMutation } from "react-query";
import { axiosInstance } from "../utils";
import "../assets/css/home.scss";

interface HomePageState{
    repos: Repo[], userProfile: UserProfile | undefined,
    sortType: string
}

const HomePage = () => {
    const [state, setState] = useState<HomePageState>({ repos: [], userProfile: undefined, sortType: "recent" });

	const getUserProfileAndReposMutation = useMutation({
		mutationKey: ["username"],
		mutationFn: (username: string) => axiosInstance.get(`/api/users/profile/${username}`),
		onSettled(data, error, variables, context) {
			if(error){
				toast.error((error as any).message);
			}

			if(data?.data){
				const { repos, userProfile } = data?.data;
				
				repos.sort((a: any, b: any) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()); //descending, recent first
				
				setState((init)=> ({...init, repos, userProfile, sortType: "recent" }));
			}
		},
	});

	useEffect(() => {
		getUserProfileAndReposMutation.mutate("lordbman");
	}, []);

	const onSearch = async (username: string) => {
		getUserProfileAndReposMutation.mutate(username);
	};

	const onSort = (sortType: string) => {
		const repos = state.repos;
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()); //descending, recent first
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
		}
		setState(init => ({...init, repos, sortType }));
	};

	return (
		<div style={{ marginTop: 50 }}>
			<Search onSearch={onSearch} />
			{state.repos.length > 0 && <SortRepos onSort={onSort} sortType={state.sortType} />}
			<div className='home-main'>
				{state.userProfile && !getUserProfileAndReposMutation.isLoading && <ProfileInfo userProfile={state.userProfile} />}

				{!getUserProfileAndReposMutation.isLoading && <Repos repos={state.repos} alwaysFullWidth={ false } />}
				{getUserProfileAndReposMutation.isLoading && <Spinner />}
			</div>
		</div>
	);
};

export default HomePage;