import s from './datasetsPage.module.scss';

import {DatasetsTable} from 'datasets/widgets/datasetsTable';
import {FilterDatasets} from "datasets/widgets/filterDatasets";
import {usePageTitle} from "common/shared/lib/hooks";
import {Button} from "common/shared/button";
import {useNavigate} from "react-router-dom";

export const DatasetsPage = () => {
    usePageTitle("Датасеты");
    const navigate = useNavigate();
    return(
        <main className={s.main__container}>
            <header className={s.datasets__header}>
                <h2 className={s.header__text}>Датасеты</h2>
                <div className={s.create__button}>
                    <Button label={"Создать"} className={"primary"} onClick={() => {navigate('/datasets/create')}}
                            img={"add_20"} imgColor={"--icon-contrast"} size="medium"/>
                </div>
            </header>

            <FilterDatasets/>
            <DatasetsTable/>
        </main>
    )
}

export default DatasetsPage;