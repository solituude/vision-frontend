import {Outlet} from "react-router-dom";

import {Sidebar} from "common/widgets/sidebar";
import {FirstLoginModal} from "common/widgets/firstLoginModal";
import {useStore} from "common/shared/tools/incrumStore/store";
import {companyStore} from "common/entities/company/model";

import s from './authView.module.scss';

export const AuthView = () => {
    const [store] = useStore(companyStore);
    return(
        <div className={s.content}>
            {store.isFirstLogin && <FirstLoginModal/>}
            <Sidebar/>
            <Outlet/>
        </div>
    )
};