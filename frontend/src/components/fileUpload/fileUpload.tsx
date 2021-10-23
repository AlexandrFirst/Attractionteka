import React from 'react';

import styles from './fileUpload.module.scss';
import cn from "classnames";

export interface FileUploadProps {
    setFile: Function;
    accept: string;
    classNames?: string;
}

const FileUpload:React.FC<FileUploadProps> = (
    {
        setFile,
        accept,
        children,
        classNames,
    }
) => {
    const ref = React.useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files);
    }

    return (
        <div
            onClick={() => ref.current?.click()}
            className={cn(styles.wrapper, classNames)}
        >
            <input
                multiple
                type="file"
                accept={accept}
                ref={ref}
                className={styles.file_input}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;