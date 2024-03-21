import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    year: z.number(),
})

type schemaType = z.infer<typeof schema>

export const useCreateProgram = (handleClose?: Function) => {
    const programs:string[] = ["Hatchdev"]

    const form = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<schemaType> = async (data) => {}

    const closeModal = () => {
        if (programs.length && handleClose) {
            handleClose()
        }
    }

    return {
        form,
        onSubmit,
        programs,
        closeModal,
    }
}
