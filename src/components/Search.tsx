import { useState } from 'react';
import { actions } from 'astro:actions'
import useDebounce from '../utils/useDebounce';
import { PortableText } from 'astro-portabletext';
const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const debouncedRequest = useDebounce(async () => {
        const { data, error } = await actions.search({ q: inputValue || '' });

        if (error) {
            console.error(error);
            return;
        }
        setSearchResults(data || []);

    })

    const handleFocus = () => setIsFocused(true);
    const handleSearch = async (event) => {
        const query = event.target.value;
        setInputValue(query)
        debouncedRequest();
    };
    return (
        <div className="relative md:m-0 mb-2">
            <input
            id="SearchField"
            name="Search"
            className="border border-gray-300 rounded-lg w-full p-2"
            type="text"
            value={inputValue}
            placeholder="Search materials..."
            onInput={handleSearch}
            onFocus={handleFocus}
            />
            {isFocused && searchResults.length > 0 && <div id="SearchResults" className="bg-white shadow-md rounded-lg p-4 max-h-60 w-full absolute z-10 left-0 top-[100%] overflow-y-scroll">
                <p className="text-xl font-bold">Search Results</p>
                {searchResults.length > 0 && (searchResults.map((item, index) => (
                    <div key={item.slug} className='mt-5'>
                        <h3 className='text-2xl'>{index + 1}. <a className='text-green-700' href={`/materials/${item.slug}`}>
                            {item.name}
                        </a></h3>
                        {item.descriptionPlainText && <p>{item.descriptionPlainText.substr(0,75)}...</p>}
                        
                    </div>
                )))}

            </div>}
        </div>
    );
};

export default Search;