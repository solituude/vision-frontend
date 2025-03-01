import {useEffect, useState} from "react";

import {useStore} from "common/shared/tools/incrumStore/store";
import {newDatasetPageStore} from "datasets/processes/model";

export const useChoiceAllColumns = () => {
    const [store] = useStore(newDatasetPageStore);
    const [choiceColumn, setChoiceColumn] = useState<object>({});

    useEffect(() => {
        const newObj = {};
        for (const i in store.dataset.columns) {
            newObj[store.dataset.columns[i].header] = false;
        }
        setChoiceColumn(newObj);
    }, []);

    return {choiceColumn, setChoiceColumn};
}