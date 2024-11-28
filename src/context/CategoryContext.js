import React, {createContext, useState} from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const addCategory = (category) => {
        if (!selectedCategories.some((cat) => cat.id === category.id)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const addCategories = (categories) => {
        const newCategories = categories.filter(
            (category) => !selectedCategories.some((cat) => cat.id === category.id)
        );
        setSelectedCategories([...selectedCategories, ...newCategories]);
    };

    const removeCategory = (category) => {
        setSelectedCategories(selectedCategories.filter((cat) => cat.id !== category.id));
    };

    return (
        <CategoryContext.Provider value={{selectedCategories, addCategory, addCategories, removeCategory}}>
            {children}
        </CategoryContext.Provider>
    );
};


export default CategoryProvider;