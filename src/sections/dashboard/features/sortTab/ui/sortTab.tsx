import {useState, FC} from "react";

import cn from "classnames";

import {Icon} from "common/shared/lib/icons/Icon";
import {SORT_STRING} from "dashboard/shared/lib";

import s from "./sortTab.module.scss";

type SortTabType = {
    titleAbove?: string
}

export const SortTab: FC<SortTabType> = ({titleAbove}) => {
    const [sortType, setSortType] = useState(SORT_STRING.ASC as string);
    const firstTabClasses = cn(s.tab__item, {
        [s['tab__item_active']]: sortType === SORT_STRING.ASC,
        [s['tab__item']]: sortType !== SORT_STRING.ASC
    });
    const secondTabClasses = cn(s.tab__item, {
        [s['tab__item_active']]: sortType === SORT_STRING.DESC,
        [s['tab__item']]: sortType !== SORT_STRING.DESC
    });

    const handleSetAscSort = () => {
        setSortType(SORT_STRING.ASC);
    }

    const handleSetDescSort = () => {
        setSortType(SORT_STRING.DESC);
    }
    return(
        <>
            <span className={s.tab__label_above}>{titleAbove}</span>
            <div className={s.tabs__container}>
                <button onClick={handleSetDescSort} className={secondTabClasses}>
                    <Icon name={'arrow_down_outline_28'} color={'--icon-primary'} width={20} height={20}/>
                    <span className={s.tab__label}>По убыванию</span>
                </button>
                <button onClick={handleSetAscSort} className={firstTabClasses}>
                    <Icon name={'arrow_up_outline_28'} color={'--icon-primary'} width={20} height={20}/>
                    <span className={s.tab__label}>По возрастанию</span>
                </button>
            </div>
        </>
    )
}