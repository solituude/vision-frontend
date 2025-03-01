import s from './startPage.module.scss';
import {Button} from "common/shared/button";
import {usePageTitle} from "common/shared/lib/hooks";
export const StartPage = () => {
    usePageTitle("Добро пожаловать");
    const handleToLogin = () => {
        window.location.replace("/login");
    }

    const handleToRegistration = () => {
        window.location.replace("/register");
    }

    return(
        <div className={s.container}>
            <span>Добро пожаловать!</span>
            <div className={s.button__container}>
                <Button key={`login-button-start-page`} label={"Войти"} className={"primary"} size="medium" onClick={handleToLogin}/>
                <Button key={`registration-button-start-page`} label={"Зарегистрироваться"} size="medium" className={"secondary"}
                        onClick={handleToRegistration}/>
            </div>


        </div>
    )
}

export default StartPage;