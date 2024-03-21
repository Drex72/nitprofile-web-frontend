import { Button } from "../Button"
import { IBaseModalProps, ModalLayout } from "./ModalLayout"
import { TfiClose } from "react-icons/tfi"

interface IProgramsModalProps extends IBaseModalProps {
    createProgram: Function
    handleClose: Function
}

export const ProgramsModal = (props: IProgramsModalProps) => {
    const { modalIsMounted, handleClose, createProgram } = props

    const programs = ["Hatchdev", "Nitdev"]

    return (
        <ModalLayout isMounted={modalIsMounted} onClose={handleClose}>
            <div>
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#676767_0.5] pb-2 text-[#000000_0.5]">
                    <h2 className="text-xl font-semibold">Select a program</h2>

                    <TfiClose
                        className="cursor-pointer text-xl transition-all duration-300 ease-in-out hover:rotate-180"
                        onClick={() => handleClose()}
                    />
                </div>

                <div className="mb-8 flex h-full max-h-[400] flex-col gap-4 overflow-y-scroll">
                    {programs.map((program, index) => (
                        <button
                            key={index}
                            className="shadow-program_card group relative mx-auto inline-flex w-[98%] items-center justify-start overflow-hidden rounded bg-white py-3 pl-4 pr-12 text-base font-normal capitalize text-[#101010]  transition-all duration-300 ease-in-out hover:pl-10 hover:pr-6"
                        >
                            <span className="absolute left-0 top-0 h-[1px] w-full bg-primary transition-all duration-150 ease-in-out group-hover:h-full"></span>
                            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"></span>
                            <span className="absolute left-0 -translate-x-12 pl-2.5 duration-200 ease-out group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                                {program}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex items-end justify-end">
                    <Button variant="contained" label="Create Program" onClick={() => createProgram()} />
                </div>
            </div>
        </ModalLayout>
    )
}
