import React from "react";
import { mapStateToProps } from "../../utils/Utils";
import { connect } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { setName } from "../../redux/searchBarSlice";
import SearchBar, { ISearchBarProps } from "./SearchBar";

const SearchByName = () => {
    const dispatch = useAppDispatch();
    const handleUserInput = (e: any) => {
        dispatch(setName(e.target.value));
    }

    const searchBarProps: ISearchBarProps = {
        label: 'Search by name',
        id: 'search-name',
        onChangeHandler: handleUserInput
    }

    return (
        <SearchBar {...searchBarProps} />
    )
}

export default connect(mapStateToProps)(SearchByName);