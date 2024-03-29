import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateProgramApi, useCreateProgramUserApi } from "@/services/programs/program-hooks"
import { programSlice, useAppDispatch, useAppSelector } from "@/state_management"
import { makeToast } from "@/libs/react-toast"

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
})

type schemaType = z.infer<typeof schema>

export const useCreateSingleProgramUser = (handleClose?: Function) => {
    const { handler, loading } = useCreateProgramUserApi()

    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    const dispatch = useAppDispatch()

    const { addProgramUser } = programSlice.actions

    const form = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<schemaType> = async (data) => {
        if (!selectedProgram) return

        const response = await handler({
            data: {
                user: data,
            },
            programid: selectedProgram.program.id,
        })

        if (!response || !response.data) return

        form.reset()

        makeToast({
            id: "user-success",
            message: "Created User Successfully",
            type: "success",
        })

        dispatch(addProgramUser(response.data))

        handleClose && handleClose()
    }

    return {
        form,
        onSubmit,
        loading,
    }
}
