import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import toast from "react-hot-toast";
import { formatDate } from "../utils";
import { Repo } from "../types";
import "../assets/css/repos.scss";

const PROGRAMMING_LANGUAGES: { [name: string]: string } = {
	"TypeScript": "/typescript.svg",
	"JavaScript": "/javascript.svg",
	"Python": "/python.svg",
	"Java": "/java.svg",
	"C++": "/c++.svg",
	"Swift": "/swift.svg",
	"Csharp": "/csharp.svg",
	"Go": "/go.svg",
	"HTML": "/html.svg",
	"CSS": "/css.svg",
};

interface RepoProps {
    repo: Repo
}

const RepoView: React.FC<RepoProps> = ({ repo }) => {
	const formattedDate = formatDate(repo.created_at);

	const handleCloneClick = async () => {
		try {
			await navigator.clipboard.writeText(repo.clone_url);
			toast.success("Repo URL cloned to clipboard");
		} catch (error) {
			toast.error("Clipboard write failed. ");
		}
	};

	return (
		<li className='mb-10 ms-7'>
			<span className='branch-logo-container'>
				<FaCodeBranch className='branch-logo' />
			</span>
			<div className='repo-details-container'>
				<a href={repo.html_url} target='_blank' rel='noreferrer' className='repo-details-name'>{repo.name}</a>
				<span className='repo-details-stars'>
					<FaRegStar /> {repo.stargazers_count}
				</span>
				<span className='repo-details-fork'>
					<FaCodeFork /> {repo.forks_count}
				</span>
				<span onClick={handleCloneClick} className='repo-details-clone'><FaCopy /> Clone</span>
			</div>

			<time className='repo-details-time'> Released on {formattedDate}</time>
			<p className='repo-details-description'>
				{repo.description ? repo.description.slice(0, 500) : "No description provided"}
			</p>
			{PROGRAMMING_LANGUAGES[repo.language] ? ( <img src={PROGRAMMING_LANGUAGES[repo.language]} alt='Programming language icon' className='h-8' />  ) : null}
		</li>
	);
};

interface ReposProps{
    repos: Repo[],
    alwaysFullWidth: boolean
}

const Repos: React.FC<ReposProps> = ({ repos, alwaysFullWidth = false }) => {
	const className = alwaysFullWidth ? "w-100" : "w-100-reponsive";

	return (
		<div className={`${className} repos-root`}>
			<ol className='repos-container'>
				{repos.map((repo) => (
					<RepoView key={repo.id} repo={repo} />
				))}
				{repos.length === 0 && <p className='repos-no-found'>No repos found</p>}
			</ol>
		</div>
	);
};
export default Repos;
