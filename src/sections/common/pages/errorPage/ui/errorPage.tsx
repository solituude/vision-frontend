import s from './errorPage.module.scss';

export const ErrorPage = () => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <img src={'https://avatars.dzeninfra.ru/get-zen-vh/271828/2a0067538ace8ebcb1eea4bdbeafa716e754/1080x1920'}
                     alt={"бу!"} className={s.cat__image}/>

                <span>Бу! Испугался? Не бойся, я друг, я тебя не обижу.
                    Иди сюда, иди ко мне, сядь рядом со мной, посмотри мне в глаза.
                    Ты видишь меня? Я тоже тебя вижу. Давай смотреть друг на друга до тех пор,
                    пока наши глаза не устанут. Ты не хочешь? Тогда <a href={'/login'}>возвращайся</a> на страницу входа, потому что произошла неожиданная ошибка ;)</span>
                <span>P.S. не забудь написать в баги путь ошибки &#x3c;3</span>
            </div>
        </div>
    )
}

export default ErrorPage;