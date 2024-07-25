import { useContext } from "react";
import { ActionSheetContext } from "../provider/ActionSheetProvider";

// Використання хука
export const useActionSheet = () => {
    const context = useContext(ActionSheetContext);
    if (!context) {
        throw new Error('useActionSheet must be used within a ActionSheetProvider');
    }
    return context;
};