import { Input } from "@/components/form"
import { Button } from "../Button"
import { IBaseModalProps, ModalLayout } from "./ModalLayout"
import { TfiClose } from "react-icons/tfi"
import { useCreateProgram } from "@/hooks/useCreateProgram"

export const CreateProgramModal = (props: IBaseModalProps) => {
    const { modalIsMounted, handleClose } = props

    const { closeModal, form, onSubmit, programs } = useCreateProgram(handleClose)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = form

    return (
        <ModalLayout canClose={programs.length ? true : false} isMounted={modalIsMounted} onClose={handleClose}>
            <div className="px-2 md:px-0">
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#676767_0.5] pb-2 text-[#000000_0.5]">
                    <h2 className="text-lg font-semibold md:text-xl">Create new Program</h2>

                    <TfiClose
                        className="cursor-pointer text-base transition-all duration-300 ease-in-out hover:rotate-180 md:text-xl"
                        onClick={() => closeModal()}
                    />
                </div>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        required
                        name="name"
                        label="Name of Program"
                        register={register}
                        placeholder="Name of Program"
                        error={errors?.name ? errors.name.message : undefined}
                    />

                    <Input
                        required
                        name="year"
                        label="Year of Program"
                        register={register}
                        placeholder="Year of Program"
                        error={errors?.year ? errors.year.message : undefined}
                    />

                    <Input
                        required
                        name="startDate"
                        type="date"
                        label="Start Date"
                        register={register}
                        error={errors?.startDate ? errors.startDate.message : undefined}
                    />

                    <Input
                        required
                        name="endDate"
                        type="date"
                        label="End Date"
                        register={register}
                        error={errors?.endDate ? errors.endDate.message : undefined}
                    />

                    <div className="flex items-end justify-end">
                        <Button label="Cancel" variant="text" />
                        <Button label="Create" variant="contained" />
                    </div>
                </form>
            </div>
        </ModalLayout>
    )
}
