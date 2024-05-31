import React, { useEffect } from "react";

export const useClickOutside = (ref:React.RefObject<HTMLElement>, callback : () => void) => {
    const handleClick = (e: MouseEvent) => {
        if (e && e.target && ref && ref.current ) {
            !ref.current.contains(e.target as Node)  && callback();
        }
    }
    useEffect(()=> {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    })
}