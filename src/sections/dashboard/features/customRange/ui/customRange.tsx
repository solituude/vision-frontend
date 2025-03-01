import s from './customRange.module.scss';
import {Input} from "common/shared/input";
export const CustomRange = () => {
    return(
        <div className={s.range__container}>
            <span className={s.range__text}>Диапазон</span>

            <div className={s.range__item}>
                <Input value={''} onChange={()=>{}} type={'text'} size={'small'} placeholder={'Мин'}/>
                <span className={s.range__text}>–</span>
                <Input value={''} onChange={()=>{}} type={'text'} size={'small'} placeholder={'Макс'}/>
            </div>
        </div>
    )
}