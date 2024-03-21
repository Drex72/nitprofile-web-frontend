import { Button } from "../Button"
import { IBaseModalProps, ModalLayout } from "./ModalLayout"
import { TfiClose } from "react-icons/tfi"

interface IProgramsModalProps extends IBaseModalProps {
    createProgram: Function
    handleClose: Function
}

export const ProgramsModal = (props: IProgramsModalProps) => {
    const { modalIsMounted, handleClose, createProgram } = props

    return (
        <ModalLayout isMounted={modalIsMounted} onClose={handleClose}>
            <div className="px-1 ">
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#676767_0.5] pb-2 text-[#000000_0.5]">
                    <h2 className="text-xl font-semibold">Select a program</h2>

                    <TfiClose
                        className="cursor-pointer text-xl transition-all duration-300 ease-in-out hover:rotate-180"
                        onClick={() => handleClose()}
                    />
                </div>

                <div className="mb-8 flex h-full max-h-[400] flex-col gap-4 overflow-y-scroll">
                    <div className=" shadow-program_card cursor-pointer rounded-sm border-t border-t-primary px-4 py-3 text-base font-normal text-[#101010]">
                        Hatchdev
                    </div>

                    <div className=" shadow-program_card cursor-pointer rounded-sm border-t border-t-primary px-4 py-3 text-base font-medium text-[#101010]">
                        Hatchdev
                    </div>
                </div>

                <div className="flex items-end justify-end">
                    <Button variant="contained" label="Create Program" onClick={() => createProgram()} />
                </div>
            </div>
        </ModalLayout>
    )
}
