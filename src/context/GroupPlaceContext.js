import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const GroupPlaceContext = createContext();

export const GroupPlaceProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGroupPlaces = async (groupId) => {
        setIsLoading(true);
        try {
            const response = await api.get(`/group/place/${groupId}/all`, {
                params: { size: 100, page: 0 },
            });
            if (response.status === 200) {
                setPlaces(response.data.content || []);
            }
        } catch (error) {
            console.error("Failed to fetch group places:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GroupPlaceContext.Provider value={{ places, isLoading, fetchGroupPlaces }}>
            {children}
        </GroupPlaceContext.Provider>
    );
};