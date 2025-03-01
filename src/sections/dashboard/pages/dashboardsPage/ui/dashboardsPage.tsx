import {useNavigate} from "react-router-dom";

import {usePageTitle} from "common/shared/lib/hooks";
import {Button} from "common/shared/button";
import {Dashboard} from "dashboard/widgets/dashboard";

import s from './dashboardPage.module.scss';

export const DashboardsPage = () => {
    usePageTitle("Дашборды");
    const navigate = useNavigate();
    return(
        <main className={s.main__container}>
            <div className={s.dashboards_page__header}>
                <h1 className={s.header}>Дашборды</h1>
                <Button label={"Добавить визуализацию"} className={'primary'}
                        onClick={() => navigate('/dashboards/newChart')}/>
            </div>

            <Dashboard/>
        </main>
    )
}

export default DashboardsPage;