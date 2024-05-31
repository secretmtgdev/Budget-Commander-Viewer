import React from "react";
import { connect } from "react-redux";

import { useAppDispatch } from "../../redux/hooks";
import { mapStateToProps } from "../../utils/Utils";
import { setQuery } from "../../redux/searchBarSlice";

const SearchBar = () => {
    const dispatch = useAppDispatch();

    const handleUserInput = (e: any) => {
        dispatch(setQuery(e.target.value));
    }
    
    return(
        <div>
            <label htmlFor='search-bar'>Search by any keyword:</label><br />
            <input onChange={handleUserInput} id='search-bar' type='text' />
        </div>
    )
}

export default connect(mapStateToProps)(SearchBar);