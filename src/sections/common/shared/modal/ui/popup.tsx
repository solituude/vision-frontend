import s from "common/shared/modal/ui/modal.module.scss";
import {Icon} from "common/shared/lib/icons/Icon";

export const Popup = (props) => {
    return(
        <div className={s.popup__container}>
            <div className={s.card__container}>
                <div className={s.card}>
                    <div className={s.header__container}>
                        <h3 className={s.header__text}>{props.headerText}</h3>
                    </div>
                    <div className={s.content}>
                        {props.component}
                    </div>
                </div>
                <button className={s.close__button} onClick={props.handleClose}>
                    <Icon name={"cancel_20"} color={"black"} width={28} height={28}/>
                </button>
            </div>
        </div>
    )
}