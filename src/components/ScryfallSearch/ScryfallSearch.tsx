import React, { useEffect, useState } from "react";
import { getAllMagicColors } from "../../utils/Utils";
import CheckboxPicker from "../CheckboxPicker/CheckboxPicker";
import { getCardsByColors } from "../../utils/Queries";

const ScryfallSearch = () => {
    const [cards, setCards] = useState([]);
    return (
        <>
            <CheckboxPicker options={getAllMagicColors()}/>
            <button onClick={() => getCardsByColors(['r'])}>Search</button>
        </>
    )
};

export default ScryfallSearch;