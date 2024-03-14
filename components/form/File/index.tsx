"use client"

import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { convertFileToReadableStream } from "./utils/convertImageToStream.service"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import React, { InputHTMLAttributes, useCallback, useEffect, useState } from "react"
import { getAsset } from "@/utils"

type IFileInput<T extends FieldValues> = {
    name: Path<T>
    label: string
    error?: string
    register: UseFormRegister<T>
    handleChange?: (file: File) => void
    fileValue?: File | string
} & InputHTMLAttributes<HTMLInputElement>

export const FileInput = <T extends FieldValues>(props: IFileInput<T>) => {
    const { name, label, error, register, fileValue, ...others } = props

    const { ref: registerRef, ...rest } = register(name)

    const [readableStream, setReadableStream] = useState<string | null>(null)

    const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (!e.target.files) return

        const file = e.target.files[0]

        await handleConvertToStream(file)

        if (props.handleChange) {
            props.handleChange(file)
        }
    }

    const handleConvertToStream = async (file: File) => {
        const stream = await convertFileToReadableStream(file)

        setReadableStream(stream)
    }

    useEffect(() => {
        console.log(fileValue)
        if (fileValue && typeof fileValue !== "string") {
            handleConvertToStream(fileValue)
        }
        if (fileValue && typeof fileValue === "string") {
            setReadableStream(fileValue)
        }
    }, [fileValue])

    const onDrop = useCallback(
        async (acceptedFiles: Array<File>) => {
            const file = acceptedFiles[0]

            await handleConvertToStream(file)

            if (props.handleChange) {
                props.handleChange(file)
            }
        },
        [props],
    )

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
                    <div className=" focus-within:border-primary flex w-full  items-center justify-center rounded-[4px] border border-solid border-transparent bg-white py-3 duration-200 ease-in">
                        <div className="flex items-center"></div>

                        <Image src={getAsset("cloud.svg", "icons")} alt="Upload" width={20} height={20} />

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
                        onChange={handleUploadFile}
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
