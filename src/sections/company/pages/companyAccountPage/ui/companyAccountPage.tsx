import s from './companyAccountPage.module.scss';
import {NavLink, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {usePageTitle} from "common/shared/lib/hooks";
import {Icon} from "common/shared/lib/icons/Icon";
import {GreenEmployeeIcon} from "company/pages/companyAccountPage/lib/GreenEmployeeIcon";
import {OrangeEmployeeIcon} from "company/pages/companyAccountPage/lib/OrangeEmployeeIcon";
import {PurpleEmployeeIcon} from "company/pages/companyAccountPage/lib/PurpleEmployeeIcon";
const cookie = new Cookies();

export const CompanyAccountPage = () => {
    const navigate = useNavigate();
    const companyName = cookie.get('company-info').name;
    usePageTitle(`Компания · ${companyName}`);
    return(
        <main className={s.container}>
            <header className={s.company__header}>
                <img className={s.company__icon} alt={"logo"} src={"https://www.clipartmax.com/png/full/231-2317477_facebook-clip-art.png"} />
                <span className={s.company__label}>{companyName}</span>
            </header>

            <section className={s.company__container}>
                <div className={s.plans__container}>

                    <div className={s.my_plan__container}>
                        <span className={s.my_plan__header}>Мой тариф</span>

                        <div className={s.my_plan__info}>
                            <div className={s.price__container}>
                                <p className={s.price__p}>
                                    <span className={s.price__rubles}>[price] ₽</span>
                                    <span className={s.price__bill}>за месяц</span></p>

                                <span className={s.price__info}>[date] следующее списание</span>
                            </div>

                            <div className={s.staff_counter__container}>
                                <Icon name={"users_3_outline_24"} width={36} height={36} color={"--icon-medium-alpha"}/>
                                <span className={s.staff_counter__number}>50</span> <span className={s.staff_counter__text}>пользователей</span>
                            </div>
                        </div>
                    </div>

                    <NavLink to='/companyaccount/plans' className={s.chg_plan__link}>
                        <span className={s.chg_plan__text}>
                            Сменить тариф
                        </span>
                        <Icon name={"chevron_compact_right_24"} width={16} height={24} color={"--icon-accent"}/>
                    </NavLink>

                </div>

                <button onClick={() => navigate('/companyaccount/staff')} className={s.staff__container}>
                    <span className={s.staff__label}>
                        Сотрудники
                    </span>

                    <div className={s.icons__container}>
                        <GreenEmployeeIcon/>
                        <OrangeEmployeeIcon/>
                        <PurpleEmployeeIcon/>
                    </div>
                </button>
            </section>
        </main>
    )
}

