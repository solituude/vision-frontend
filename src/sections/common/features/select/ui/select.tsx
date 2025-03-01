import {FC, Fragment} from "react";

import {Dropdown} from "common/shared/dropdown";
import {useDropdown} from "common/shared/lib/hooks";

import s from './select.module.scss';


type SelectType = {
    name: string,
    value?: string | number,
    onChange: (item: any) => void,
    type: 'radio' | 'checkbox',
    items: any[],
    svgName?: string,
    placeholder?: string,
    titleAbove?: string,
}

export const Select: FC<SelectType> = (props) => {
    const {showDropdown, handleOpenDropdown, handleCloseDropdown} = useDropdown();

    return(
        <div key={props.name} className={s.select__container}>
            <Dropdown label={props.value || props.placeholder}
                      img={props.svgName} titleAbove={props.titleAbove}
                      showDropdown={showDropdown}
                      handleCloseDropdown={handleCloseDropdown}
                      handleOpenDropdown={handleOpenDropdown}>
                <div className={s.dropdown__container}>
                    {
                        props.items.map((item) => (
                            <Fragment key={`${props.name}-select-dropdown-${item}`}>
                                <div id={`${props.name}-select-dropdown-${item}`}
                                     className={s.dropdown__item}>
                                    <input type={props.type}
                                           id={item}
                                           value={item}
                                           checked={item === props.value}
                                           onChange={(e) => {
                                               props.onChange(e.target.value)
                                           }}
                                           className={`custom__${props.type}`}
                                    />
                                    <label htmlFor={item} className={s.dropdown__label}>{item}</label>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
            </Dropdown>
        </div>
    )
}