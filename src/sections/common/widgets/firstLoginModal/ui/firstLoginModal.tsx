import {useNavigate} from "react-router-dom";
import {Modal} from "common/shared/modal";
import {useStore} from "common/shared/tools/incrumStore/store";
import {companyStore as store} from "common/entities/company/model";
import {companyServices as services} from 'common/entities/company/model';

import s from './firstLoginModal.module.scss';

export const FirstLoginModal = () => {
    const navigate = useNavigate();
    const [, companyServices] = useStore(store, services);
    return (
        <div className={s.out__container}>
            <Modal component={
                <div className={s.main__container}>
                    <div className={s.info_content}>
                        <p className={s.content__p}>
                            Уважаемый(ая) [Имя пользователя], Спасибо за регистрацию в&nbsp;системе Vision!
                        </p>
                        <p className={s.content__p}>
                            Теперь вы&nbsp;можете выбрать тарифный план. Для начала вы&nbsp;можете
                            воспользоваться пробным 7-дневным периодом для изучения возможностей Vision. На пробном периоде
                            вам
                            будет доступен абсолютно весь функционал платформы.
                        </p>
                        <p className={s.content__p}>
                            Если у&nbsp;вас возникнут вопросы, наша поддержка всегда готова помочь. Напишите
                            нам на&nbsp;support@vision.com. </p>
                        <p className={s.content__p}>
                            С&nbsp;уважением, Команда Vision
                        </p>
                    </div>


                    <div className={s.footer__container}>
                        <button className={s.footer__button} onClick={() => {
                            companyServices.setIsFirstLoginFalse();
                            navigate('/companyaccount/plans');
                        }}>
                            <span className={s.footer__text}>Выбрать тариф</span>
                        </button>
                    </div>
                </div>}
                   headerText={"Добро пожаловать в Vision!"}
                   handleClose={() => {
                       companyServices.setIsFirstLoginFalse();
                       navigate('/companyaccount/plans');
                   }}
            />
        </div>
    )
}