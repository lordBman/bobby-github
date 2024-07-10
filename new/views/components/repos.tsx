import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import toast from "react-hot-toast";
import { formatDate } from "../utils";
import type { Repo } from "../types";
import "../assets/css/repos.scss";

const PROGRAMMING_LANGUAGES: { [name: string]: string } = {
	"TypeScript": "/images/typescript.svg",
	"JavaScript": "/images/javascript.svg",
	"Python": "/images/python.svg",
	"Java": "/images/java.svg",
	"C++": "/images/c++.svg",
	"Swift": "/images/swift.svg",
	"Csharp": "/images/csharp.svg",
	"Go": "/images/go.svg",
	"HTML": "/images/html.svg",
	"CSS": "/images/css.svg",
	"Dart": "/images/flutter.svg",
	"Kotlin": "/images/kotlin.svg",
	"Svelte": "/images/svelte.svg",
	"GDScript": "/images/gdscript.svg",
	"Rust": "/images/rust.svg",
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
		<li style={{ marginBottom: "2.5rem", marginLeft: "1.8rem", overflow:"visible" }}>
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
			{PROGRAMMING_LANGUAGES[repo.language] ? ( <img src={PROGRAMMING_LANGUAGES[repo.language]} alt='Programming language icon' style={{ height: "3.5rem" }} />  ) : null}
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
