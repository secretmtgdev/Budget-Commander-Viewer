import React, { useEffect, useState } from 'react';
import './AliasesRenderer.css';
import { gql, useQuery } from '@apollo/client';
import { ALIAS_QUERY } from '../../utils/ApiConstants';
import { ServerLib } from '../../utils/Types';
import AliasesRowRenderer from './AliasesRowRenderer';

const AliasesRenderer = () => {
    const { loading, error, data } = useQuery(gql`${ALIAS_QUERY}`);
    const [aliases, setAliases] = useState(Array<ServerLib.IAlias>);
    useEffect(() => {
        if (loading) {
            // TODO: Create a generic loading spinner
        }
        
        if (error) {
            // TODO: Create a generic error component to handle server failure
        }

        if (data) {
            setAliases(data.allAliases);
        }
    });

    return (
        <>
            {aliases.length && 
                <table>
                    <thead>
                        <tr>
                            <th scope='col'>Alias</th>
                            <th scope='col'>Query</th>
                            <th scope='col'>Short Description</th>
                        </tr>      
                    </thead>
                    <tbody>
                        {aliases.map(alias => <AliasesRowRenderer {...alias} />)}
                    </tbody>
                </table>
            }
        </>
    );
}

export default AliasesRenderer;