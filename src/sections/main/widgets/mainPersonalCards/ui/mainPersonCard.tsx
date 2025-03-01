import React from 'react';
import {PERSON_CARD_INFO} from '../lib';
import favoriteIcon from '../lib/assets/favoriteIcon.svg';
import usersIcon from '../lib/assets/usersIcon.svg';
import workIcon from '../lib/assets/workIcon.svg';
import userIcon from '../lib/assets/userIcon.svg';
import s from './mainPersonCard.module.scss';
import {useNavigate} from 'react-router-dom';

const iconMap: { [key: string]: string } = {
    'Личное': userIcon,
    'КомпаниНейм': workIcon,
    'Общее': usersIcon,
    'Избранные': favoriteIcon
};

export const MainPersonCard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={s.person_card__container}>
            {PERSON_CARD_INFO.map((card) => {
                const iconSrc = iconMap[card.name];

                return (
                    <div
                        key={card.id}
                        className={s.person__card}
                        style={{backgroundColor: card.color}}
                        onClick={() => navigate("/" + card.url)}
                    >
                        {iconSrc && <img src={iconSrc} alt={card.name} className={s.icon}/>}
                        <div className={s.card__name}>{card.name}</div>
                    </div>
                );
            })}
        </div>
    );
};
