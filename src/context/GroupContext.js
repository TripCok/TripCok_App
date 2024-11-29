import React, {createContext, useState} from 'react';

export const GroupContext = createContext();

export const GroupProvider = ({children}) => {
    const [groupData, setGroupData] = useState([]);
    const [page, setPage] = useState(0);

    return (
        <GroupContext.Provider value={{groupData, setGroupData, page, setPage}}>
            {children}
        </GroupContext.Provider>
    );
};
