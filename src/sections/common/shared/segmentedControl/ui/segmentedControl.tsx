import {Dispatch, FC, ReactNode, SetStateAction} from "react";
import cn from "classnames";
import sSC from "./segmentedControl.module.scss";
import sVT from './visTabs.module.scss';

type SegmentedControlType = {
    tabActive: string,
    setTabInd: Dispatch<SetStateAction<string>>,
    firstTabValue: string,
    secondTabValue: string,
    firstTabNode?: ReactNode,
    secondTabNode?: ReactNode,
    isVis?: boolean
}

export const SegmentedControl:FC<SegmentedControlType> = (props) => {
    const s = props.isVis ? sVT : sSC;
    const firstTabClasses = cn(s.tab__item, {
        [s['tab__item_active']]: props.tabActive === props.firstTabValue,
        [s['tab__item']]: props.tabActive !== props.firstTabValue
    });
    const secondTabClasses = cn(s.tab__item, {
        [s['tab__item_active']]: props.tabActive === props.secondTabValue,
        [s['tab__item']]: props.tabActive !== props.secondTabValue
    });

    return(
        <div className={s.tabs__container}>
            <button onClick={() => props.setTabInd(props.firstTabValue)} className={firstTabClasses}>
                {props.firstTabNode}
            </button>
            <button onClick={() => props.setTabInd(props.secondTabValue)} className={secondTabClasses}>
                {props.secondTabNode}
            </button>
        </div>
    )
}