import {useState} from "react";
import {Modal} from "common/shared/modal";
import {useNavigate} from "react-router-dom";
import s from './staffAddPage.module.scss';
import {AddingManually} from "./addingManually/addingManually";
import {AddingCSV} from "./addingCSV/addingCSV";
import {usePageTitle} from "common/shared/lib/hooks";

const PageContent = () => {
    const [isManually, setIsManually] = useState(true);
    return (
        <div className={s.main__container}>
            <div className={s.tabs__container}>
                <button onClick={() => setIsManually(true)}
                        className={isManually ? s.tabs__item_active : s.tabs__item}>
                    <span className={isManually ? s.tabs__label_active : s.tabs__label}>
                        Вручную
                    </span>
                </button>

                <button onClick={() => setIsManually(false)}
                        className={!isManually ? s.tabs__item_active : s.tabs__item}>
                    <span className={!isManually ? s.tabs__label_active : s.tabs__label}>
                        Импорт csv
                    </span>
                </button>
            </div>
            {
                isManually ? <AddingManually/> : <AddingCSV/>
            }

        </div>
    )
}

export const StaffAddPage = () => {
    usePageTitle("Сотрудники · Добавление", "Сотрудники");

    const navigate = useNavigate();
    return (
        <Modal headerText={"Новые сотрудники"}
               component={<PageContent/>}
               handleClose={() => {
                   navigate('/companyaccount/staff')
               }}
        />
    )
}
export default StaffAddPage;