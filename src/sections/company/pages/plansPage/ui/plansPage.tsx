import {Breadcrumbs} from "common/widgets/breadcrumbs";
import {PlanOverview} from "company/widgets/planOverview";
import {PlansComparison} from "company/widgets/plansComparison";
import {usePageTitle} from "common/shared/lib/hooks";

import s from './plansPage.module.scss';

export const PlansPage = () => {
    usePageTitle(`Тарифные планы`);
    return(
        <main className={s.container}>
            <Breadcrumbs/>
            <section className={s.plans_info__section}>
                <h2 className={s.header__text}>Выберите тариф для своей команды</h2>
                <PlanOverview/>
                <h2 className={s.header__text}>Сравнение тарифов</h2>
                <PlansComparison/>
            </section>
        </main>
    )
}