import React, { createContext, useState } from 'react';
import UserProvider from "./UserProvider";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const addCategory = (category) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const removeCategory = (category) => {
        setSelectedCategories(selectedCategories.filter((cat) => cat.id !== category.id));
    };

    return (
        <CategoryContext.Provider value={{ selectedCategories, addCategory, removeCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;