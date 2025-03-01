import {useState} from "react";

import {usePageTitle} from "common/shared/lib/hooks";
import {Button} from "common/shared/button";
import {NotificationPopup, notificationStore} from "common/widgets/notificationPopup";
import {useStore} from "common/shared/tools/incrumStore/store";
import {ErrorStoreType} from "common/widgets/notificationPopup/model/notificationStore";
import {getDatasets, uploadCSVFile} from "connections/pages/connectionsPage/api/connectionsAPI";
import {ConnectionsTable} from "connections/widgets/connectionsTable";

import s from './connectionsPage.module.scss';

export const ConnectionsPage = () => {
    const [file, setFile] = useState<string | Blob>('');
    const [store]: ErrorStoreType[] = useStore(notificationStore);
    usePageTitle("Подключения");

    return(
        <main className={s.connection_page__container}>
            <div className={s.connection_page__header}>
                <h2 className={s.header}>Подключения</h2>
                <Button label={"Создать"} className={'primary'} size={'medium'} img={'add_20'} imgColor={'--icon-contrast'}/>
            </div>

            <ConnectionsTable/>

            
            <input type={"file"} onInput={(e) => {
                setFile(e.target["files"][0]);
            }}/>
            <Button onClick={() => {
                const formData = new FormData();
                formData.append("Name", "penguins");
                formData.append("File", file);
                console.log(formData.get('File'));
                uploadCSVFile(formData).then(res => {
                    if (!res.ok) {
                        store.text = 'Ошибка: хз поч не работает .-.';
                    }
                } )
            }}
                label={"Добавить подключение"} className={"primary"} size={"small"}/>

            <Button onClick={() => {getDatasets()}}
                    label={"Получить датасеты"} className={"primary"} size={"small"}/>
            <NotificationPopup/>
        </main>
    )
}
export default ConnectionsPage;