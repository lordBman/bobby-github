import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ProfileInfo, Repos, Search, SortRepos, Spinner } from "../components";
import { Repo, UserProfile } from "../types";

interface HomePageState{
    repos: Repo[], userProfile: UserProfile | undefined,
    sortType: string
}

const HomePage = () => {
    const [state, setState] = useState<HomePageState>({ repos: [], userProfile: undefined, sortType: "recent" });
	const [loading, setLoading] = useState(false);

	const getUserProfileAndRepos = useCallback(async (username = "lordbman") => {
		setLoading(true);
		try {
			const res = await fetch(`/api/users/profile/${username}`);
			const { repos, userProfile } = await res.json() as { repos: Repo[], userProfile: UserProfile };

			repos.sort((a: any, b: any) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()); //descending, recent first

			setState((init)=> ({...init, repos, userProfile, sortType: "recent" }));

		} catch (error) {
			toast.error((error as any).message);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);

	const onSearch = async (username: string) => {
		await getUserProfileAndRepos(username);
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
		<div className='m-4'>
			<Search onSearch={onSearch} />
			{state.repos.length > 0 && <SortRepos onSort={onSort} sortType={state.sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{state.userProfile && !loading && <ProfileInfo userProfile={state.userProfile} />}

				{!loading && <Repos repos={state.repos} alwaysFullWidth={ false } />}
				{loading && <Spinner />}
			</div>
		</div>
	);
};

export default HomePage;