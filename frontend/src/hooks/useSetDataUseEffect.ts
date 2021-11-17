import React from "react";

export const useSetDataUseEffect = (value: any, setData: Function) => {
    React.useEffect(() => {
       value && setData(value)
    }, [])
}
