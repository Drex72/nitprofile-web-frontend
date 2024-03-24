"use client"

import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import React, { InputHTMLAttributes } from "react"
import { IDropZoneHandlerProps, useFormDropzone } from "@/hooks/useDropZone"
import { CloudIcon } from "@/public/icons"

type IFileInput<T extends FieldValues> = {
    name: Path<T>
    label: string
    error?: string
    register: UseFormRegister<T>
    handleChange?: (file: IDropZoneHandlerProps) => void
    fileValue?: File | string
} & InputHTMLAttributes<HTMLInputElement>

export const FileInput = <T extends FieldValues>(props: IFileInput<T>) => {
    const { name, label, error, register, fileValue, ...others } = props

    const { ref: registerRef, ...rest } = register(name)

    const { onDrop, handleUploadFile, readableStream } = useFormDropzone({
        handleChange: props.handleChange,
        initialValue: props.fileValue,
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })
    return (
        <div className="atmua-input flex w-full flex-col">
            <span
                className={` mb-2 text-sm font-medium text-[#272727] md:mb-3 md:text-base ${
                    others.disabled ? "disabled" : ""
                }`}
            >
                {label}

                {others.required ? <sup className={`text-sm leading-none text-[#EF233C] md:text-base`}>*</sup> : null}
            </span>

            {!readableStream && (
                <label
                    {...getRootProps()}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                >
                    <div className=" flex w-full items-center  justify-center rounded-[4px] border border-solid border-transparent bg-white py-3 duration-200 ease-in focus-within:border-primary">
                        <div className="flex items-center"></div>

                        <CloudIcon />

                        <p className="ml-3 text-sm font-normal text-[#939393] ">
                            {/* TODO: Work on the animation for this */}
                            <span
                                className={`${isDragActive ? "opacity-1" : "opacity-0"} transition-all duration-300 ease-in-out`}
                            >
                                Drop the files here
                            </span>

                            <span
                                className={`${!isDragActive ? "opacity-1" : "opacity-0"} transition-all duration-300 ease-in-out`}
                            >
                                Drag and drop files to attach or <span className="text-[#4F5DC1]">browse</span>
                            </span>
                        </p>
                    </div>
                    <input
                        {...getInputProps()}
                        {...rest}
                        type="file"
                        id={name}
                        name={name}
                        accept="image/*"
                        className="h-0 w-0 "
                    />
                </label>
            )}

            {readableStream && (
                <div className="my-5 flex h-full w-full items-center justify-center">
                    <Image width={200} height={200} src={readableStream} alt="Passport Photograph" />
                </div>
            )}

            {error && !others.disabled && <span className={`mt-1 text-xs text-[#EF233C]`}>{error}</span>}
        </div>
    )
}
