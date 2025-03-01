import Sprite from './sprite.svg';
export const Icon = ({name, color='', width, height}) => (
    <svg width={width} height={height}>
        <use xlinkHref={`${Sprite}#${name}`} fill={`var(${color})`}/>
    </svg>
)