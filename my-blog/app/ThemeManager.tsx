'use client'

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "./store"

const useAppSeletor = useSelector.withTypes<RootState>()

export default function ThemeManager() {
    const theme = useAppSeletor(state => state.theme.theme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return null
}