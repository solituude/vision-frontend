import {useState} from "react";
import {Resizable} from "react-resizable";
import {getValidSize, isResize} from "common/shared/lib/helpers/resizableBlockHelper";

import './resizableBlock.scss';

export const ResizableBlock = ({initialSize, children, direction}) => {
    const [size, setSize] = useState(initialSize);

    return (
        <Resizable height={size.height}
                   width={size.width}
                   resizeHandles={[direction]}
                   onResize={(_, {size}) => {
                       isResize(size, direction) && setSize(size);
                   }}>
            <div style={{height: getValidSize(size.height), width: getValidSize(size.width)}}>
                {children}
            </div>
        </Resizable>
    );
}