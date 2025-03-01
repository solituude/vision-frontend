import {useRef} from "react";
import {createPortal} from "react-dom";

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {useVirtualizer} from '@tanstack/react-virtual'

import {useStore} from "common/shared/tools/incrumStore/store";
import {Popup} from "common/shared/modal/ui/popup";
import {Input} from "common/shared/input";
import {Button} from "common/shared/button";
import {ResizableBlock} from "common/shared/resizableBlock";
import {newDatasetPageServices, newDatasetPageStore} from "datasets/processes/model";
import {useObserveContainerSize} from "datasets/shared/lib/hooks/useObserveContainerSize";

import s from './dataTable.module.scss';

export const DataTable = () => {
    const [store, services] = useStore(newDatasetPageStore, newDatasetPageServices);
    const dataTableContainerRef = useRef<HTMLDivElement | null>(null);
    const observedRef = useObserveContainerSize(dataTableContainerRef);

    const table = useReactTable({
        data: store.dataset.data,
        columns: store.dataset.columns.map((col) => ({
            ...col,
            header: col.header || col.accessorKey,
        })),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    const rowVirtualizer = useVirtualizer({
        count: store.dataset.data.length,
        estimateSize: () => 40,
        getScrollElement: () => observedRef.current,
        measureElement:
            typeof window !== 'undefined' &&
            navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    });

    const handleCloseColumn = (e) => {
        services.hideColumn();
        services.setChosenColumn(e, -1, '');
    }

    return (
        <div ref={dataTableContainerRef} className={s.container}>
            <ResizableBlock initialSize={{height: Infinity, width: 1000}} direction="w">
                <table className={s.data_table}>
                    <thead className={s.data_table__thead}>
                    {
                        table.getHeaderGroups().map((headerG) =>
                            <tr key={headerG.id} className={s.data_table__th}>

                                {headerG.headers.map((header) => {
                                    return (
                                        (header.column.columnDef as any).visible &&
                                        <th key={header.id}
                                            style={{width: header.getSize()}}
                                            className={store.chosenColumn.id === header.index ?
                                                    s.ceil__container_h1_active : s.ceil__container}

                                            onClick={(e) => {
                                                console.log(header)
                                                services.setChosenColumn(e, header.index, header.column.id);
                                            }}>

                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    }
                    </thead>
                    <tbody className={s.data_table__tbody}
                           style={{height: `${rowVirtualizer.getTotalSize()}px`}}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = table.getRowModel().rows[virtualRow.index];
                        return (
                            <tr key={row.id}
                                data-index={virtualRow.index}
                                ref={node => rowVirtualizer.measureElement(node)}
                                className={s.data_table__tr}
                                style={{transform: `translateY(${virtualRow.start}px)`}}>

                                {row.getVisibleCells().map((cell) => {
                                    store.chosenColumn.columnName === cell.column.id && console.log(cell);
                                    return (
                                        (cell.column.columnDef as any).visible &&
                                        <td className={store.chosenColumn.columnName === cell.column.id ?
                                            s.ceil__container_active : s.ceil__container}
                                            style={{ width: cell.column.getSize()}}
                                            key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                {
                    store.dataset.columns[store.chosenColumn.id]?.visible &&
                    createPortal(
                        <div style={{marginLeft: store.chosenColumn.position,
                                     marginTop: 100,
                                     position: "absolute",
                                     top: 0}}>
                            <Popup headerText={"Настройка колонки"}
                                   component={
                                       <div className={s.popup__container}>
                                           <Input value={store.dataset.columns[store.chosenColumn.id]?.accessorKey}
                                                  onChange={(str) => services.updateColumnTitle(store.dataset.columns[store.chosenColumn.id]?.accessorKey, str)}
                                                  type={"text"}
                                                  size={"small"}/>
                                           <Button label={"Скрыть колонку"} onClick={handleCloseColumn}
                                                   className={'secondary'} fullWidth={true} img={"hide_outline_24"}
                                                   imgColor={"--icon-accent"} size={"small"}/>
                                           <Button label={"Удалить колонку"} className={'negative_secondary'}
                                                   fullWidth={true}
                                                   img={"delete_outline_24"} imgColor={"--icon-negative"}
                                                   size={"small"}/>
                                       </div>
                                   }
                                   handleClose={() => {
                                       store.chosenColumn = {...store.chosenColumn, id: -1, columnName: ''};
                                   }}
                            />
                        </div>, document.body)
                }
            </ResizableBlock>
        </div>
    )
}