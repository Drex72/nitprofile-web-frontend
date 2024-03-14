import React, { InputHTMLAttributes } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TInputProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    error?: string
    prefixIcon?: React.ReactNode
    register: UseFormRegister<T>
} & InputHTMLAttributes<HTMLInputElement>

export const Input = <T extends FieldValues>(props: TInputProps<T>) => {
    const { name, label, error, prefixIcon, register, ...others } = props

    return (
        <label htmlFor={name} className=" flex w-full flex-col">
            <span
                aria-disabled={others.disabled}
                className={`mb-2  flex  items-center gap-[1px] text-sm font-medium text-[#272727]  disabled:text-[#B7B7B7] md:mb-3 md:text-base`}
            >
                {label}

                {others.required ? <p className={`text-sm leading-none text-[#EF233C] md:text-base`}>*</p> : null}
            </span>

            <div
                className={`focus-within:border-primary flex flex-row gap-x-2 overflow-hidden rounded-[4px] border border-solid border-transparent bg-white duration-200 ease-in ${
                    error ? "!border-[#EF233C]" : ""
                }`}
            >
                <input
                    disabled={others.disabled}
                    id={name}
                    className={` text-text-color-main flex-1 px-5 py-3 text-sm font-normal outline-none placeholder:text-sm placeholder:text-[#B7B7B7] disabled:cursor-not-allowed disabled:bg-[#F9F9F9]  md:text-base md:placeholder:text-base`}
                    {...register(name)}
                    {...others}
                />

                {prefixIcon ? prefixIcon : null}
            </div>

            {error && !others.disabled && <span className={` mt-1 text-xs text-[#EF233C]`}>{error}</span>}
        </label>
    )
}
