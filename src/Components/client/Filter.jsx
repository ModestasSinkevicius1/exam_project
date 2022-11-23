import { useContext, useState } from "react";
import DataContext from "../../Context/DataContext.jsx";

function Filter(){

    const [type, setType] = useState('any');
    const [search, setSearch] = useState('');

    const { setBooks } = useContext(DataContext);

    const doFilter = (b) =>{
        try{
            const regStr = new RegExp(`^${search.toLowerCase()}`);
            if((b.category === type || type === 'any') && (regStr.test(b.name.toLowerCase()) || search === ''))
                return true;
        }
        catch{
            return false;
        }      
        return false;
    }

    const filterItems = () =>{
        setBooks(book => book.map(b => doFilter(b) ? ({...b, show: true}) : ({...b, show: false})));
    }

    return(
        <div className="filter container">
            <div className="filter-search">
                <input type="search" className="search-input input-text" placeholder="Ieškoti..." value={search} onChange={e => setSearch(e.target.value)}></input>
            </div>
            <div className="filter-inputs">
                <div className="filter-input-container">
                    <label>Kategorija</label>
                    <select className="input-select" value={type} onChange={e => setType(e.target.value)}>
                        <option value={'any'}>Any</option>
                        <option value='action'>Action</option>
                        <option value='comedy'>Comedy</option>
                        <option value='horror'>Horror</option>
                        <option value='drama'>Drama</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='fantasy'>Fantasy</option>
                    </select>
                </div>
                <button className="btn btn-filter" onClick={filterItems}>Pritaikyti</button>
            </div>
        </div>
    )
}

export default Filter;