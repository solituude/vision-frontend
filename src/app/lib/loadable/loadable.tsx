import {ComponentProps, ComponentType, lazy, Suspense} from 'react';

export const loadable = <T extends ComponentType<any>>(importF: () => Promise<{ [key: string]: T }>,
                                                       nameComp: string) => {
    const LazyComponent = lazy(() =>
        importF().then((module) => ({
            default: module[nameComp],
        }))
    );


    return (props: ComponentProps<T>) => (
        <Suspense fallback={<div className={"background__loader"}></div>}>
            <LazyComponent {...props} />
        </Suspense>
    );
}
