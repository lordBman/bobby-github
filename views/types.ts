export type UserProfile = {
	avatar_url?: string,
	bio?: string,
	email: string,
	followers: number,
	following: number,
	html_url?: string,
	location?: string,
	name?: string,
	public_gists: number,
	public_repos: number,
	twitter_username: string,
	login: string,
    created_at: string
};

export type Repo = {
    id: string,
    name: string,
    clone_url: string,
    created_at: string,
    html_url: string,
    stargazers_count: number,
    forks_count: number,
    description: string,
    language: string
}