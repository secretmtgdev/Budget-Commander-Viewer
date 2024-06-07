import React from "react";
import { mapStateToProps } from "../../utils/Utils";
import { connect } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { setAlias } from "../../redux/searchBarSlice";
import SearchBar, { ISearchBarProps } from "./SearchBar";

const SearchBarAlias = () => {
    const dispatch = useAppDispatch();
    const handleUserInput = (e: any) => {
        dispatch(setAlias(e.target.value));
    }

    const searchBarProps: ISearchBarProps = {
        label: 'Search by alias',
        id: 'search-alias',
        onChangeHandler: handleUserInput
    }

    return (
        <SearchBar {...searchBarProps} />
    )
}

export default connect(mapStateToProps)(SearchBarAlias);