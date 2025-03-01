import {FC, Dispatch, SetStateAction, useState} from "react";

import {ClickAwayListener} from "@mui/material";

import {OpenProps} from "../lib";
import {BlackTooltip} from "common/shared/blackTooltip";
import {Modal} from "common/shared/modal";
import {Button} from "common/shared/button";
import {Icon} from "common/shared/lib/icons/Icon";
import {userAPI} from "common/entities/user/api";
import {LicenseType} from "company/pages/plansPage/lib/types";
import {licensesAPI} from "company/widgets/planOverview/api";

import s from './planOverview.module.scss';

type PropsType = {
    openInfo: OpenProps
    setOpen: Dispatch<SetStateAction<OpenProps>>
}

export const ChoosePlanModal: FC<PropsType> = ({openInfo, setOpen}) => {
    const [steps, setSteps] = useState<number>(1);
    return (
        <>
            {steps === 1 ?
                <Modal headerText={"Выбрать тариф"}
                       component={
                           <div className={s.feature__content}>
                               <div className={s.change_plan__container}>
                                   <div className={s.features__container}>
                                                  <span
                                                      className={s.features__text_regular}>Возможности {openInfo.info.type}</span>

                                       <div className={s.features__list}>
                                           {//перечисление возможностей тарифа
                                               openInfo.info.features?.map(feature => (
                                                   <div className={s.features__group}>
                                                                  <span
                                                                      className={s.features__label}>{feature.label}</span>

                                                       <div className={s.point__list}>
                                                           {
                                                               feature.list.map(item => (
                                                                   <div className={s.point__container}>
                                                                       <Icon name={"check_circle_outline_24"}
                                                                             color={"--icon-positive"}
                                                                             width={20} height={20}/>
                                                                       <span
                                                                           className={s.features__text_regular}>{item}</span>
                                                                   </div>
                                                               ))
                                                           }
                                                       </div>
                                                   </div>
                                               ))}
                                       </div>
                                       <div className={s.footer__container}>
                                           <Button label={"Оставить заявку на смену тарифа"}
                                                   className={"primary"}
                                                   size="medium"
                                                   fullWidth={true}
                                                   onClick={() => {
                                                       console.log(openInfo.info);
                                                       licensesAPI.addLicenseRequest(openInfo.info.id).then(res =>
                                                           console.log("add license", res));
                                                       setSteps(2);
                                                       userAPI.getCompanyInfo();
                                                   }}/>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       }
                       handleClose={() => {
                           setOpen({info: {} as LicenseType, isOpen: false});
                       }}
                /> :

                <div key={openInfo.info.id} className={s.background__modal}>
                    <ClickAwayListener onClickAway={() => setOpen({info: {} as LicenseType, isOpen: false})}>
                        <div className={s.modal__content}>
                            <BlackTooltip label={"Заявка отправлена"} text={"Обращение в обработке, с вами\n" +
                                "свяжется команда Vision"}/>
                        </div>

                    </ClickAwayListener>
                </div>
            }
        </>
    )
}