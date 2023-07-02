import React from "react";


export default function useInput(initialValue: string) {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange
    }
}