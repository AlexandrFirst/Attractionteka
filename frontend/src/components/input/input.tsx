import React from 'react';
import cn from "classnames";

import passwordIcon from './img/pass.svg';
import passwordInvisible from './img/invisible_pass.svg';
import styles from './input.module.scss';

export interface InputPops extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    classnames?: string;
    icon?: React.ReactNode;
    password?: boolean;
    changeVisibility?: Function;
}
const Input:React.FC<InputPops> = (props) => {

    React.useEffect(() => {
        setNowIcon(props.icon);
        setInputType(props.type);
    },[props.icon, props.type]);

    const changeVisibility = () => {
        if(props.changeVisibility) {
            props.changeVisibility();
        }
    }

    const [inputType, setInputType] = React.useState(props.type?.toString());
    const [nowIcon, setNowIcon] = React.useState<React.ReactNode>('');
    
    return (
        <div className={styles.wrapper}>
            <input
                className={cn(styles.input, props.classnames)}
                {...props}
                type={inputType}
            />
            <div
                className={cn(styles.icon, {
                    [styles.icon_active]: props.changeVisibility,
                })}
                onClick={() => changeVisibility()}
            >
                {nowIcon}
            </div>
        </div>
    );
};

export default Input;