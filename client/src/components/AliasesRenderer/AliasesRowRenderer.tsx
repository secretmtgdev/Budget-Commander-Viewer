import React from "react";

import { ServerLib } from "../../utils/Types";

const AliasesRowRenderer = ({ alias, query, shortDescription }: ServerLib.IAlias) => {
    return (
        <tr>
            <td>{alias}</td>
            <td>{query}</td>
            <td>{shortDescription}</td>
        </tr>
    )
}

export default AliasesRowRenderer;