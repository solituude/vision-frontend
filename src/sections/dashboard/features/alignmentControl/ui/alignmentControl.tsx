import {useState} from "react";

import {Icon} from "common/shared/lib/icons/Icon";
import {SegmentedControl} from "common/shared/segmentedControl";
import {ALIGNMENT} from "dashboard/shared/lib";

import s from './alignmentControl.module.scss';

export const AlignmentControl = () => {
    const [alignment, setAlignment] = useState(ALIGNMENT.LEFT as string);
    return(
        <div className={s.control__container}>
            <span className={s.control__label}>Выравнивание</span>
            <SegmentedControl tabActive={alignment} setTabInd={setAlignment}
                     firstTabValue={ALIGNMENT.LEFT} secondTabValue={ALIGNMENT.RIGHT}
                     firstTabNode={<Icon name={'lines_3_horizontal_left_outline_28'} color={'--icon-primary'}
                                                  width={20} height={20}/>}
                     secondTabNode={<Icon name={'lines_3_horizontal_right_outline_28'} color={'--icon-primary'}
                                                   width={20} height={20}/>}
            />
        </div>
    );
}