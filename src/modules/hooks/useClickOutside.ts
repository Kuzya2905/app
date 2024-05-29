import React, { useEffect } from "react"

export const useClickOutside = (myRef:React.RefObject<HTMLElement>, collback:() => void) => {
    const handleclick = (e: MouseEvent) => {
        if (e && myRef && myRef.current && e.target && !myRef.current.contains(e.target as Node)) {
            collback()
        }
    }
    useEffect(()=> {
        document.addEventListener('mousedown', handleclick);

        return () => {
            document.removeEventListener('mousedown', handleclick)
        }
    })
}