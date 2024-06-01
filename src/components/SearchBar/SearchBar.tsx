import React from "react";
import { connect } from "react-redux";

import { mapStateToProps } from "../../utils/Utils";

export interface ISearchBarProps {
    id: string;
    label: string;
    onChangeHandler: (e: any) => void;
}

const SearchBar = ({ id, label, onChangeHandler }: ISearchBarProps) => {    
    return(
        <div>
            <label htmlFor={id}>{label}</label><br />
            <input onChange={onChangeHandler} id={id} type='text' />
        </div>
    )
}

export default connect(mapStateToProps)(SearchBar);