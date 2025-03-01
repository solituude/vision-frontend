import {Outlet, useNavigate} from "react-router-dom";
import {Breadcrumbs} from "common/widgets/breadcrumbs";
import {StaffTable} from "company/widgets/staffTable";
import {StaffFilters} from "company/features/staffFilters";
import {usePageTitle} from "common/shared/lib/hooks";
import {useGetAllUsers} from "company/pages/staffPage/lib";
import {Button} from "common/shared/button";

import s from './staffPage.module.scss'
// import {useDataset} from "common/shared/tools/dataset";
// import {XMLRequest} from "common/shared/tools/dataset/XMLRequest";
// import {useEffect} from "react";

export const StaffPage = () => {
    const navigate = useNavigate();
    usePageTitle("Сотрудники");
    useGetAllUsers();
    // const [data1, data2, data3] = useDataset(StaffDatasource, undefined, undefined);
    // useEffect(() => {
    //     console.log(data1);
    //     console.log(data2);
    //     console.log(data3)
    // }, [data1]);
    return (
        <main className={s.container}>
            <Breadcrumbs/>
            <section className={s.main__section}>
                <div className={s.staff__table}>
                    <div className={s.staff__header}>
                        <h3 className={s.header}>Сотрудники</h3>
                        <div className={s.add__button}>
                            <Button label={"Добавить"}
                                    className={"primary"}
                                    onClick={() => navigate('/companyaccount/staff/add')}
                                    img={"add_24"}
                                    imgColor={"--icon-contrast"}
                                    size="big"/>
                        </div>
                    </div>
                    <StaffFilters/>
                    <div className={s.table__container}>
                        <StaffTable/>
                    </div>
                </div>
            </section>
            <Outlet/>
        </main>
    )
}