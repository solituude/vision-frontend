import React from "react";
import s from './mainPage.module.scss';
// import { MainFilters } from "main/features/mainFilters";
// import { MainSearch } from "main/features/mainSearch";
// import { MainPersonCard } from "main/widgets/mainPersonalCards";
// import { MainObjectsFilters } from "main/widgets/mainObjectFilters";
// import { MainObjectCard } from "main/widgets/mainObjectCards";
import { Outlet } from "react-router-dom";
import {usePageTitle} from "common/shared/lib/hooks";

export const MainPage: React.FC = () => {
    usePageTitle("Главная");
    // const [text, setText] = useState("");
    // const [isDarkened, setIsDarkened] = useState(false);

    return (
        <main className={s.container}>
            {/*{isDarkened && <div className={s.overlay} />}*/}

            {/*<section className={s.main__section}>*/}
            {/*    <div className={`${s.search__area_container} ${isDarkened ? s.nonDarkened : ""}`}>*/}
            {/*        <MainSearch inputText={text} setInputText={setText} setIsDarkened={setIsDarkened} />*/}
            {/*        <MainFilters />*/}
            {/*    </div>*/}

            {/*    <div className={`${s.main_personal__objects} ${isDarkened ? s.darkened : ""}`}>*/}
            {/*        <MainPersonCard />*/}
            {/*    </div>*/}
            {/*    <div className={`${s.main_objects__filters} ${isDarkened ? s.darkened : ""}`}>*/}
            {/*        <MainObjectsFilters />*/}
            {/*    </div>*/}
            {/*    <div className={`${s.main__objects} ${isDarkened ? s.darkened : ""}`}>*/}
            {/*        <MainObjectCard />*/}
            {/*    </div>*/}
            {/*</section>*/}
            <Outlet />
        </main>
    );
};

export default MainPage;