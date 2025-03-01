import {createPortal} from "react-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {OverlayChildren} from "react-bootstrap/Overlay";

import {loadable} from "app/lib/loadable/loadable";
import {useStore} from "common/shared/tools/incrumStore/store";
import {companyStore, CompanyStoreType} from "common/entities/company/model";
import {Button} from "common/shared/button";
import {Icon} from "common/shared/lib/icons/Icon";
import {useDataset} from "common/shared/tools/dataset";
import {licensesDatasource} from "company/widgets/planOverview/api";
import {PendingData} from "common/features/pendingData";
const ChoosePlanModal = loadable(() => import("./choosePlanModal"), "ChoosePlanModal");
import {useChosenLicense} from "company/pages/plansPage/lib";
import {FREE_PLAN} from "../lib/constants";

import s from "./planOverview.module.scss";

export const PlanOverview = () => {
    const [company]: CompanyStoreType[] = useStore(companyStore);
    const [dataStatus, licenses,] = useDataset(licensesDatasource, undefined, true);
    const {chosenLicenseInfo, openModal, setOpenModal} = useChosenLicense();

    const renderPlans = licenses && licenses?.map(plan => (
        <div key={`license-info-${plan.id}`}
             className={chosenLicenseInfo?.id === plan.id && chosenLicenseInfo?.type !== FREE_PLAN ||
             (chosenLicenseInfo?.id === plan.id && plan.type === FREE_PLAN && !company.isFreePlanExpired) ? s.card_active : s.card}>
            <span className={s.plan__name}>{plan.type}</span>

            <div className={s.price__container}>
                {// Цена тарифа
                    plan.pricePerMounth ?
                        <p><span className={s.price}>{plan.pricePerMounth} ₽</span>
                            <span className={s.per_month__text}>/ мес</span></p> :
                        <span className={s.price}>Бесплатный</span>
                }
                {// Цена тарифа при оплате за год
                    plan.pricePerYear ?
                        <span className={s.sale__text}>
                            {Math.ceil(plan.pricePerYear/12)} ₽ / мес при оплате за год
                        </span> :
                        null
                }
            </div>


            {
                chosenLicenseInfo?.id === plan.id && plan.type !== FREE_PLAN || (chosenLicenseInfo?.id === plan.id && plan.type === FREE_PLAN && !company.isFreePlanExpired) ?
                    <div className={s.button__container}>
                        <Button className={"secondary"} label={"Текущий тариф"} size="medium" fullWidth={true}/>
                    </div>

                    :

                    <OverlayTrigger
                        overlay={company.isFreePlanExpired && plan.id === licenses[3].id ?
                            <Tooltip id="tooltip-disabled">
                                <span className={s.overlay__text}>Пробный период завершен</span>
                            </Tooltip> : <></> as OverlayChildren}>

                        <div className={s.button__container}>
                            <Button label={"Выбрать тариф"}
                                    className={"primary"}
                                    size="medium"
                                    disabled={company.isFreePlanExpired && plan.id === licenses[3].id}
                                    onClick={() => setOpenModal({isOpen: true, info: plan})} fullWidth={true}/>
                        </div>

                    </OverlayTrigger>
            }


            <div className={s.features__container}>
                <span className={s.features__text_regular}>{plan.labelFeatures}</span>

                <div className={s.features__list}>
                    {//перечисление возможностей тарифа
                        plan.features?.map(feature => (
                            <div className={s.features__group}>
                                <span className={s.features__label}>{feature.label}</span>

                                <div className={s.point__list}>
                                    {
                                        feature.list.map(item => (
                                            <div className={s.point__container}>
                                                <Icon name={"check_circle_outline_24"}
                                                      color={"--icon-positive"}
                                                      width={20} height={20}/>
                                                <span className={s.features__text_regular}>{item}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    ))

    return (
        <div className={s.plans_card__container}>
            <PendingData dataStatus={dataStatus} errorComponent={<div>ошибка</div>} loaderComponent={<>lflllflf</>}/>
            {renderPlans}
            {openModal.isOpen && createPortal(<ChoosePlanModal openInfo={openModal} setOpen={setOpenModal} />, document.body)}
        </div>
    )
}
