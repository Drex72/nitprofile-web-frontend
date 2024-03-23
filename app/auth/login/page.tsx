"use client"

import React from "react"
import { Input } from "@/components/form"
import { Button } from "@/components/ui/Button"
import { useLoginApi } from "@/services/auth/auth-hooks"
import { getAsset } from "@/utils"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"

/**
 * Schema for login form validation.
 * @constant {z.ZodObject<z.ZodRawShape>}
 */
const schema = z.object({
    email: z.string().email(),
    password: z.string(),
})

/**
 * Type definition for schema object.
 * @typedef {Object} schemaType
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 */
type schemaType = z.infer<typeof schema>

/**
 * Represents the login component.
 * @returns {JSX.Element} Login component.
 */
const Login = () => {
    /**
     * Custom hook to handle login functionality.
     * @type {object}
     */
    const { handler, loading } = useLoginApi()

    const router = useRouter()

    /**
     * React Hook Form instance for form management.
     * @type {object}
     */
    const form = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    /**
     * Destructuring form methods and properties.
     * @type {object}
     */
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = form

    return (
        <div className="relative flex h-full items-center justify-center bg-[#ededee] ">
            <Image
                alt="Logo"
                width={120}
                height={35}
                src={getAsset("nitda_logo.png", "icons")}
                unoptimized
                priority
                className="absolute left-5 top-5"
            />
            <div className=" mx-auto w-[80%] rounded-lg bg-white px-5 pb-16 pt-10 shadow-lg md:w-full md:max-w-[450px] ">
                <h2 className="text-center text-lg font-semibold text-[#101010] md:text-2xl ">Welcome Back</h2>

                <form onSubmit={handleSubmit(handler)} className="mt-7 flex flex-col gap-4">
                    <Input
                        required
                        name="email"
                        type="email"
                        label="Email Adddress"
                        register={register}
                        placeholder="Enter your Email Address"
                        error={errors?.email ? errors.email.message : undefined}
                    />

                    <Input
                        required
                        name="password"
                        type="password"
                        label="Password"
                        register={register}
                        placeholder="Enter your Password"
                        error={errors?.password ? errors.password.message : undefined}
                    />

                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" className="cursor-pointer" />
                            <span className="text-sm font-light">Remember me</span>
                        </div>

                        <div className="text-sm font-medium tracking-tight text-primary underline">
                            Forgot Password?
                        </div>
                    </div>

                    <Button variant="contained" label="Login" loading={loading} type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login
