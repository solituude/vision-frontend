import React from 'react';
import s from './mainObjectCard.module.scss';
import {Table} from "react-bootstrap";
import {CardInfoType} from 'common/entities/systemObject/model/types';

import folderIcon from '../lib/assets/FolderIcon.svg';
import dashboardIcon from '../lib/assets/DashboardIcon.svg';
import usersIcon from '../lib/assets/usersIcon.svg';
import favoriteIcon from '../lib/assets/favoriteIcon.svg';
import moreIcon from '../lib/assets/moreIcon.svg';
import NoFavoriteIconDrowdown from '../lib/assets/NoFavoriteIconDrowdown.svg'
import WriteIconDrowdown from '../lib/assets/WriteIconDrowdown.svg'
import UserAddIconDrowdown from '../lib/assets/UserAddIconDrowdown.svg'
import favoriteIconDrowdown from '../lib/assets/favoriteIconDrowdown.svg'
import {CardRenderTable} from './cardRenderTable';

import {Dropdown} from 'react-bootstrap';

interface Props {
    filteredObjects: CardInfoType[];
    viewType: "grid" | "list";
}

const MainObjectCardContainer: React.FC<Props> = ({filteredObjects, viewType}) => {

    return (
        <div className={s.card__container}>
            {viewType === "grid" ? (
                filteredObjects.map((card) => (
                    <div key={card.ObjectId} className={s.person__card}>
                        <img
                            alt="icon"
                            src={card.ObjectType === "FOLDER" ? folderIcon : dashboardIcon}
                            className={s.icon}
                        />
                        <div className={s.card__name}>{card.ObjectName}</div>

                        <div className={s.buttons_container}>
                            <div className={s.button}>
                                {card.ObjectIsShared && (
                                    <img className={s.card__more_buttons} alt='icon' src={usersIcon}/>
                                )}
                            </div>

                            <div className={s.button}>
                                {card.ObjectIsFavorites && (
                                    <img className={s.card__more_buttons} alt='icon' src={favoriteIcon}/>
                                )}
                            </div>

                            <Dropdown>
                                <Dropdown.Toggle as="div" id="dropdown-basic" className={s.toggle}>
                                    <div className={s.button}>
                                        <img className={s.card__more_buttons} alt='icon' src={moreIcon}/>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">
                                        <div className={s.dropdown__row}>
                                            <img alt='icon' src={UserAddIconDrowdown}/>
                                            <span className={s.dropdown__text}>Поделиться</span>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">
                                        <div className={s.dropdown__row}>
                                            <img alt='icon' src={WriteIconDrowdown}/>
                                            <span className={s.dropdown__text}>Переименовать</span>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                        {card.ObjectIsFavorites ? (
                                            <div className={s.dropdown__row}>
                                                <img alt='icon' src={NoFavoriteIconDrowdown}/>
                                                <span className={s.dropdown__text}>Удалить из избранного</span>
                                            </div>
                                        ) : (
                                            <div className={s.dropdown__row}>
                                                <img alt='icon' src={favoriteIconDrowdown}/>
                                                <span className={s.dropdown__text}>Добавить в избранное</span>
                                            </div>
                                        )}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                ))
            ) : (
                <Table style={{overflow: "scroll", margin: 0}} className={s.list__table}>
                    <thead>
                    <tr className={s.table__header}>
                        <td className={s.header__item}>
                            <span style={{paddingLeft: '12px'}} className={s.table_header__text}>Название</span>
                        </td>
                        <td className={s.header__item}></td>
                        <td className={s.header__item}>
                            <span className={s.table_header__text}>Создатель</span>
                        </td>
                        <td className={s.header__item}>
                            <span className={s.table_header__text}>Дата создания</span>
                        </td>
                        <td className={s.header__item}></td>
                    </tr>
                    </thead>

                    <tbody className={s.body__table}>
                    {filteredObjects && filteredObjects.length > 0 ? (
                        filteredObjects.map((card) => (
                            <CardRenderTable key={card.ObjectId} currentCard={card}/>
                        ))
                    ) : (
                        <tr className={s.item__row}>
                            <td colSpan={6} style={{textAlign: "center"}}>
                                <span className={s.text}>Данных нет</span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export const MainObjectCard = (MainObjectCardContainer);
