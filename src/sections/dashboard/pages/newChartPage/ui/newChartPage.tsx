import {useState} from "react";

import cn from "classnames";

import {Icon} from "common/shared/lib/icons/Icon";
import {Button} from "common/shared/button";
import {Separator} from "common/shared/separator";
import {useBack, usePageTitle} from "common/shared/lib/hooks";
import {SegmentedControl} from "common/shared/segmentedControl";
import {ChartDistributor} from "dashboard/entities/charts";
import {ChartTypeSelect} from "dashboard/features/chartTypeSelect";
import {ChartConfigDistributor} from "../middlewares/chartConfigDistributor";


import s from './newChartPage.module.scss';


const DATASET = 'Датасет';
const VISUALIZATION = 'Визуализация';

const enum Tabs {
    type = 'type',
    config = 'config',
    info = 'info'
}

const VisualizationConfig = () => {
    const [selectedSection, setSelectedSection] = useState<Tabs>(Tabs.type);

    const renderTab = (section: Tabs, label: string) => {
        const tabClasses = cn(s.visualizationConfig__tab, {
            [s['visualizationConfig__tab--active']]: selectedSection === section,
            [s['visualizationConfig__tab']]: selectedSection !== section
        });

        const tabLabelClasses = cn(s.visualizationConfig__tabLabel, {
            [s['visualizationConfig__tabLabel--active']]: selectedSection === section,
            [s['visualizationConfig__tabLabel__tab']]: selectedSection !== section
        });

        return (
            <button
                onClick={() => setSelectedSection(section)}
                className={tabClasses}>
                <span className={tabLabelClasses}>{label}</span>
            </button>
        )
    };

    return (
        <div className={s.visualizationConfig__container}>
            <div className={s.visualizationConfig__tabsContainer}>
                {renderTab(Tabs.type, "Тип чарта")}
                {renderTab(Tabs.config, "Настройка чарта")}
                {renderTab(Tabs.info, "Информация")}
            </div>
            <Separator/>
            <div className={s.visualizationConfig__section}>
                {selectedSection === Tabs.type && <ChartTypeSelect/>}
                {selectedSection === Tabs.config && <ChartConfigDistributor/>}
            </div>
        </div>
    );
}

// TODO: сделать алерт "Вы точно хотите покинуть страницу?"

export const NewChartPage = () => {
    usePageTitle('Новая визуализация')
    const [selectedSection, setSelectedSection] = useState(DATASET);

    const {handleBack} = useBack();

    return(
        <main className={s.main__component}>
            <header className={s.header}>
                <div className={s.header__left}>
                    <button onClick={handleBack}>
                        <Icon name={'arrow_left_outline_24'} height={24} width={24} color={'--icon-accent'}/>
                    </button>
                    <span className={s.header__label}>Новая визуализация</span>
                </div>
                <div className={s.segmented_control__container}>
                    <SegmentedControl firstTabValue={DATASET} secondTabValue={VISUALIZATION}
                             setTabInd={setSelectedSection}
                             tabActive={selectedSection} isVis={true}
                             firstTabNode={<div className={s.chartPage__tab}>{DATASET}</div>}
                             secondTabNode={<div className={s.chartPage__tab}>{VISUALIZATION}</div>}/>

                </div>
                <div className={s.save_button__container}>
                    <Button label={"Сохранить"} className={'primary'} size={'small'}/>
                </div>
            </header>

            <section className={s.work__area}>
                {selectedSection === VISUALIZATION && <>
                    <VisualizationConfig/>
                    <ChartDistributor/>
                </>}

            </section>
        </main>
    )
}