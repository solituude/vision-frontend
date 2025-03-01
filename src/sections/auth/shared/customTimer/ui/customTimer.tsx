import {FC, useEffect, useState} from 'react';

type CustomTimerPropsType = {
    initialSeconds: number;
    setIsTimerActive: (isActive: boolean) => void;
}

export const CustomTimer:FC<CustomTimerPropsType> = ({initialSeconds, setIsTimerActive}) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);


    useEffect(() => {
        if (seconds > 0) {
            const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsTimerActive(false);
        }
    }, [seconds, setIsTimerActive]);

    return <span>{seconds} секунд</span>;
};
