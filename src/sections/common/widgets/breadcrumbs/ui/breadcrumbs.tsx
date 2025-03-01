import {JSX, useRef} from "react";
import {NavLink} from "react-router-dom";

import {BREADCRUMBS_ROUTES} from "common/widgets/breadcrumbs/lib/constants";

import s from './breadcrumbs.module.scss';

const getBreadcrumbs = (link: string[]): JSX.Element[] => {
    const array: JSX.Element[] = [];
    for (let i = 0; i < link?.length - 1; i++) {
        array.push(
            <NavLink to={'/' + link.slice(0, i + 1).join('/')} key={i + 1} className={s.route__link}>
                <span className={s.route__text}>{BREADCRUMBS_ROUTES[link[i]]}</span>
            </NavLink>);
        array.push(<span className={s.route__slash} key={i * 42390}>/</span>)
    }
    array.push(<span className={s.route__text}
                     key={link.length * 42390}>{BREADCRUMBS_ROUTES[link[link.length - 1]]}</span>)
    return array;
}

export const Breadcrumbs = () => {
    const link: string[] = window.location.pathname.split('/').slice(1);
    const ref = useRef(null);

    return (
        <div id="bread" ref={ref} className={s.container}>
            {getBreadcrumbs(link)}
        </div>
    )
}