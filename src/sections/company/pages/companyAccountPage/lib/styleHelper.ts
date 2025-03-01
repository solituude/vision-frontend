import s from "common/widgets/sidebar/ui/sidebar.module.scss";

export const childFoldersStyle = (link, isHideSidebar, isDisabled, currLink) => {
    if (isHideSidebar) {
        if (isDisabled) return s.regular__folder_disabled;
        if (currLink === link) {
            return s.regular__folder_active;
        }
        return s.regular__folder;
    }
    if (isDisabled) {
        return s.main__folder_disabled;
    }
    if (currLink === link) {
        return s.main__folder_active;
    } else {
        return s.main__folder;
    }
}