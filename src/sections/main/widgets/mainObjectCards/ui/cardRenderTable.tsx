import React from 'react';
// import { toggleFavorite } from 'common/entities/systemObject/model/store/objectActions.ts'
import favoriteBlueIcon from '../lib/assets/favoriteBlueIcon.svg';
import unfavoriteBlueIcon from '../lib/assets/unfavoriteIcon.svg';
import folderIcon from '../lib/assets/FolderIcon.svg';
import dashboardIcon from '../lib/assets/DashboardIcon.svg';
import usersIcon from '../lib/assets/usersIcon.svg';
import favoriteIcon from '../lib/assets/favoriteIcon.svg';
import userAddIcon from '../lib/assets/userAddIcon.svg'
import penIcon from '../lib/assets/penIcon.svg'
import s from './cardRenderTable.module.scss';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

interface Card {
  ObjectId: number;
  ObjectType: string;
  ObjectName: string;
  ObjectIsShared: boolean;
  ObjectIsFavorites: boolean;
  ownerName: string;
  ownerEmail: string;
  dateOfCreating: string;
}

type CardRenderTableProps = {
  currentCard: Card;
};

export const CardRenderTable: React.FC<CardRenderTableProps> = ({ currentCard }) => {

  const handleFavoriteToggle = () => {
    // dispatch(toggleFavorite(currentCard.ObjectId));
  };

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      borderRadius: 8
    },
  }));

  const navigate = useNavigate();

  return (
    <tr className={s.item__row}>
      <td style={{ paddingLeft: '24px' }} className={s.body__item}>
        <div>
          <img
            alt="icon"
            src={currentCard.ObjectType === "FOLDER" ? folderIcon : dashboardIcon}
            className={s.icon}
          />
          <span className={s.text}>{currentCard.ObjectName}</span>
        </div>
      </td>
      <td className={s.body__item}>
        <div className={s.buttons_container}>

          <div className={s.button}>
            {currentCard.ObjectIsShared && (
              <img className={s.card__more_buttons} alt='icon' src={usersIcon} />
            )}
          </div>


          <div className={s.button} onClick={handleFavoriteToggle}>
            {currentCard.ObjectIsFavorites && (
              <img className={s.card__more_buttons} alt='icon' src={favoriteIcon} />
            )}
          </div>
        </div>
      </td>
      <td className={s.body__item}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div><span className={s.text}>{currentCard.ownerName}</span></div>
          <div><span className={s.email}>{currentCard.ownerEmail}</span></div>
        </div>
      </td>
      <td className={s.body__item}><span className={s.text}>{currentCard.dateOfCreating}</span></td>
      <td className={s.body__item}>
        <div className={s.buttons_container}>
          <div className={s.button}>
            <img className={s.card__more_buttons} alt='icon' src={userAddIcon} />
          </div>
          <div className={s.button}>
            <BootstrapTooltip title="Переименование" arrow placement="top">
              <button className={s.button__item} onClick={() => {
                navigate(`/main/mainPage/edit/${currentCard?.ObjectId}`);
              }}><img className={s.card__more_buttons} alt='icon' src={penIcon} /></button>
            </BootstrapTooltip>
            
          </div>
          {currentCard.ObjectIsFavorites ? (
            <div className={s.button} onClick={handleFavoriteToggle}>
              <img className={s.card__more_buttons} alt='icon' src={unfavoriteBlueIcon} />
            </div>
          ) : (
            <div className={s.button} onClick={handleFavoriteToggle}>
              <img className={s.card__more_buttons} alt='icon' src={favoriteBlueIcon} />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
