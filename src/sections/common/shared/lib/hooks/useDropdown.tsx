import {useState} from "react";

export const useDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleOpenDropdown = () => {
        setShowDropdown(!showDropdown);
    }
    const handleCloseDropdown = () => {
        setShowDropdown(false);
    }

    return {showDropdown, handleOpenDropdown, handleCloseDropdown};
}