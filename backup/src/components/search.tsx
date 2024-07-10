import { useState } from "react";
import { IoSearch } from "react-icons/io5";

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
		<form className='.search-root' onSubmit={onSubmit}>
			<label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only'>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 start-0 flex items-center z-10 ps-3 pointer-events-none'>
					<IoSearch className='w-5 h-5' />
				</div>
				<input type='search' id='default-search' className='search-input' placeholder='i.e. johndoe' required value={username} onChange={change} />
				<button type='submit' className='search-button'>Search</button>
			</div>
		</form>
	);
};

export default Search;