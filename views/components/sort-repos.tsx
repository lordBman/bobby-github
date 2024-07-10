import React from "react";
import "../assets/css/sort-repo.scss";

interface SortReposProps{
    onSort: CallableFunction;
    sortType: string;
}

const BUTTONS = [
	{ type: "recent", text: "Most Recent" },
	{ type: "stars", text: "Most Stars" },
	{ type: "forks", text: "Most Forks" },
];

const SortRepos: React.FC<SortReposProps> = ({ onSort, sortType }) => {
	return (
		<div className='sort-repo'>
			{BUTTONS.map((button) => (
				<button key={button.type} type='button' className={`sort-repo-button ${ button.type == sortType ? "border-blue-500" : "" }`}
					onClick={() => onSort(button.type)}>
					{button.text}
				</button>
			))}
		</div>
	);
};

export default SortRepos;