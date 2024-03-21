import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    otherName: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type schemaType = z.infer<typeof schema>

export const useUserSettings = () => {
    const pathname = usePathname()

    const [profileMode, setProfileMode] = useState<"edit" | "view">("edit")

    const form = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<schemaType> = async (data) => {}

    useEffect(() => {
        const allPaths = pathname.split("/")

        if (allPaths.includes("edit")) {
            setProfileMode("edit")
        } else {
            setProfileMode("view")
        }
    }, [pathname])

    return {
        form,
        onSubmit,
        profileMode,
        setProfileMode
    }
}
