import { Input } from "@/components/form"
import { Button } from "../Button"
import { IBaseModalProps, ModalLayout } from "./ModalLayout"
import { TfiClose } from "react-icons/tfi"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
})

export const CreateUserModal = (props: IBaseModalProps) => {
    const { modalIsMounted, handleClose } = props

    type schemaType = z.infer<typeof schema>

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<schemaType> = async (data) => {}

    return (
        <ModalLayout isMounted={modalIsMounted} onClose={handleClose}>
            <div className="px-2 md:px-0">
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#676767_0.5] pb-2 text-[#000000_0.5]">
                    <h2 className="text-lg font-semibold md:text-xl">Create new User</h2>

                    <TfiClose
                        className="cursor-pointer text-base transition-all duration-300 ease-in-out hover:rotate-180 md:text-xl"
                        onClick={() => handleClose && handleClose()}
                    />
                </div>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        required
                        name="firstName"
                        label="First Name"
                        register={register}
                        placeholder="First Name"
                        error={errors?.firstName ? errors.firstName.message : undefined}
                    />

                    <Input
                        required
                        name="lastName"
                        label="Last Name"
                        register={register}
                        placeholder="Last Name"
                        error={errors?.lastName ? errors.lastName.message : undefined}
                    />

                    <Input
                        required
                        name="email"
                        label="Email"
                        register={register}
                        placeholder="Email"
                        error={errors?.email ? errors.email.message : undefined}
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
