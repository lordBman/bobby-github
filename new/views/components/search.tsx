import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "../assets/css/search.scss";

interface SearchProps{
    onSearch: CallableFunction
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
	const [username, setUsername] = useState("");

    const change = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);

    const onSubmit = (event: React.FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();

        if(username.length > 0){
            onSearch(username);
        }
    }

	return (
		<form className='search-root' onSubmit={onSubmit}>
			<div className='search-icon-container '>
				<IoSearch className='search-icon' />
			</div>
			<input type='search' id='default-search' className='search-input' placeholder='Search GitHub Users i.e. johndoe' required value={username} onChange={change} />
		</form>
	);
};

export default Search;