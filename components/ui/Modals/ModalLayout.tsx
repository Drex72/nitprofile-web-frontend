"use client"

import { ConditionalComponent } from "@/components/animation"
import { useEffect, useState } from "react"

interface IModalProps {
    children: React.ReactNode
    onClose?: Function
    isMounted: boolean
    canClose?: boolean
}
export interface IBaseModalProps {
    modalIsMounted: boolean
    handleClose?: Function
}

export function ModalLayout(props: IModalProps) {
    const { children, onClose, canClose = true, isMounted } = props

    const [showModal, setShowModal] = useState(isMounted)

    useEffect(() => {
        setShowModal(isMounted)
    }, [isMounted])

    return (
        <ConditionalComponent isMounted={showModal} delay={200}>
            <div className="fixed bottom-0 left-0 right-0 top-0 z-10 ">
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 z-50 h-screen  w-screen scale-100 bg-black opacity-20 transition-all duration-300 ease-in-out"
                    onClick={() => {
                        if (canClose) {
                            setShowModal(false)
                            onClose && onClose()
                        }
                    }}
                />
                <div
                    className={`absolute left-1/2 top-1/2 z-[9999]  max-h-[900px] w-[90%]  -translate-x-1/2 -translate-y-1/2 scale-100 overflow-x-hidden overflow-y-scroll rounded-[16px] bg-[#E3E5F6]  px-3 py-5  transition-all duration-300 ease-in-out md:max-w-[500px] md:p-5`}
                >
                    {children}
                </div>
            </div>
        </ConditionalComponent>
    )
}
