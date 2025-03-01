import React from 'react';
import s from './mainObjectsFilters.module.scss';

export const MainObjectsFilters: React.FC = () => {
    // const dispatch = useDispatch();
    // const viewType = useSelector((state: RootState) => state.listView.viewType);

    // const handleButtonClick = (button: 'list' | 'grid') => {
    //     dispatch({
    //         type: ListViewActionTypes.SET_VIEW_TYPE,
    //         payload: button,
    //     });
    // };

    return (
        <div className={s.objects_filters__container}>
            <span className={s.text}>Недавние</span>
            <div className={s.filters__button_container}>
                {/*<div*/}
                {/*    className={`${s.button} ${viewType === 'list' ? s.button__active : s.button__disactive}`}*/}
                {/*    onClick={() => handleButtonClick('list')}*/}
                {/*>*/}
                {/*    <img alt="menu" src={menuIcon} className={viewType === 'list' ? s.icon__active : s.icon__disactive} />*/}
                {/*</div>*/}
                {/*<div className={s.divider}></div>*/}
                {/*<div*/}
                {/*    className={`${s.button} ${viewType === 'grid' ? s.button__active : s.button__disactive}`}*/}
                {/*    onClick={() => handleButtonClick('grid')}*/}
                {/*>*/}
                {/*    <img alt="square" src={squareIcon} className={viewType === 'grid' ? s.icon__active : s.icon__disactive} />*/}
                {/*</div>*/}
            </div>
        </div>
    );
};
