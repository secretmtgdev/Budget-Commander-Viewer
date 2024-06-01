import React from "react";
import { mapStateToProps } from "../../utils/Utils";
import { connect } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { setText } from "../../redux/searchBarSlice";
import SearchBar, { ISearchBarProps } from "./SearchBar";

const SearchByText = () => {
    const dispatch = useAppDispatch();
    const handleUserInput = (e: any) => {
        dispatch(setText(e.target.value));
    }

    const searchBarProps: ISearchBarProps = {
        label: 'Search by text',
        id: 'search-text',
        onChangeHandler: handleUserInput
    }

    return (
        <SearchBar {...searchBarProps} />
    )
}

export default connect(mapStateToProps)(SearchByText);