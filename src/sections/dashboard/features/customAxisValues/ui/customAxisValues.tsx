import {useState} from "react";

import {InputForm} from "common/shared/inputForm";

export const CustomAxisValues = () => {
    const [customString, setCustomString] = useState('');
    return (
        <InputForm key={'custom-axis-values'} label={'Подписать только эти значения на оси'}
                   placeholder={'100, 200, 400'} value={customString} setValue={setCustomString}/>
    )
}