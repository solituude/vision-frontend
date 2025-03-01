import {MutableRefObject, useEffect, useState} from "react";
export const useObserveContainerSize = (dataTableContainerRef: MutableRefObject<HTMLElement | null>) => {
    const [size, setSize] = useState({width: 600, height: 300});

    useEffect(() => {
        if (!dataTableContainerRef.current) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            const element = dataTableContainerRef.current;
            if (element) {
                const parentWidth = (element.offsetParent as HTMLElement)?.offsetWidth || 0;
                const offsetHeight = element.offsetHeight;
                const offsetLeft = element.offsetLeft;
                if (parentWidth - offsetLeft!== size.width) {
                    setSize({
                        ...size,
                        width: parentWidth - offsetLeft
                    });
                }
                if (dataTableContainerRef.current?.offsetHeight !== size.height) {
                    setSize({...size, height: offsetHeight});
                }
            }
        });

        resizeObserver.observe(dataTableContainerRef.current);

        return function cleanup() {
            resizeObserver.disconnect();
        }
    }, [dataTableContainerRef.current]);
    return dataTableContainerRef;
}