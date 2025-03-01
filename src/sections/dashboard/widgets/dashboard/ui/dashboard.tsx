import {useEffect, useState} from 'react';
import 'app/app.scss';
import GridLayout from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// TODO: хранение расположения карточек в localStorage
const widthNewCard: number = 2;
const heightNewCard: number = 4;


export const Dashboard = () => {
    const [, setWindowWidth] = useState<number>(window.innerWidth);

    const [layoutConfig, setLayoutConfig] = useState<GridLayout.Layout[]>([
        { i: 'item1', x: 0, y: 0, w: 2, h: 3 },
        { i: 'item2', x: 2, y: 0, w: 4, h: 3 },
        { i: 'item3', x: 6, y: 0, w: 2, h: 3 }
    ]);

    const addWidget = (): void => {
        const newWidget: GridLayout.Layout = { i: `item${layoutConfig.length + 1}`, x: 0, y: 0, w: widthNewCard, h: heightNewCard };

        const updatedLayout = layoutConfig.map((item) => {
            return {
                ...item,
                y: item.y + heightNewCard,
            };
        });

        setLayoutConfig([newWidget, ...updatedLayout]);
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <button onClick={addWidget}>Добавить карточку</button>
            <GridLayout
                layout={layoutConfig}
                cols={12}
                rowHeight={30}
                width={window.innerWidth}
                onLayoutChange = {(nl) => setLayoutConfig(nl)}>

                {
                    layoutConfig.map((card) => (
                        <div key={card.i} style={{ background: '#a4d2f6', borderRadius: 12, padding: 8, boxSizing: "border-box"}}>
                            {card.i}
                        </div>
                    ))
                }
            </GridLayout>
        </>
    );
}

