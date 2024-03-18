import { IBaseModalProps, ModalLayout } from "./ModalLayout"

interface IProgramsModalProps extends IBaseModalProps {
    createProgram: Function
}

export const ProgramsModal = (props: IProgramsModalProps) => {
    const { modalIsMounted, handleClose, createProgram } = props

    return (
        <ModalLayout isMounted={modalIsMounted} onClose={handleClose}>
            <div className=" px-8 py-10">
                <h2 className="text-primary-dark text-center text-3xl font-bold">Password Reset Successful!</h2>

                <button onClick={() => createProgram()}>Create Program</button>
            </div>
        </ModalLayout>
    )
}
