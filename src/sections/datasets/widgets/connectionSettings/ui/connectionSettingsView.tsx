import {
    ExpandFolderTables,
    ExpandFolderConnection,
    UsedTables} from "datasets/widgets/connectionSettings";

import s from './connectionSettingsView.module.scss';

export const ConnectionSettingsView = () => {
    return (
        <div className={s.main__container}>
            <ExpandFolderConnection/>
            <div className={s.separator}/>
            <ExpandFolderTables/>
            <UsedTables/>
        </div>
    )
}