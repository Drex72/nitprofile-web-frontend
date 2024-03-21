"use client"
import { BsPencil } from "react-icons/bs"
import { Input } from "@/components/form"
import { useUserSettings } from "@/hooks/useUserSettings"
import { Button } from "@/components/ui/Button"
import { useAppSelector } from "@/state_management"
import Image from "next/image"
import { getAsset } from "@/utils"

const Profile = () => {
    const { form, onSubmit, profileMode, setProfileMode } = useUserSettings()

    const { data } = useAppSelector((state) => state.authSlice)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = form

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <div className="relative mb-4 h-[150px] w-[150px]">
                        <Image
                            src={getAsset("dummyAvatar.png", "images")}
                            alt="Avatar"
                            width={150}
                            height={150}
                            className="rounded-full shadow-md"
                        />

                        {profileMode === "edit" && (
                            <>
                                <label
                                    className="absolute -bottom-4 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white transition-all duration-150 ease-in-out hover:border-primary hover:bg-transparent"
                                    htmlFor="uploadFile"
                                >
                                    <BsPencil className="text-lg text-primary" />

                                    <input
                                        className="h-0 w-0 "
                                        id="uploadFile"
                                        type="file"
                                        accept="image/png, image/jpg, image/gif, image/jpeg"
                                    />
                                </label>
                            </>
                        )}
                    </div>

                    <div className="text-[#505050]">
                        <h2 className="text-xl font-semibold ">
                            {data?.firstName ?? "Victor"} {data?.lastName ?? "Odumuyiwa"}
                        </h2>

                        <p className="text-xs font-light text-[#676767_0.5]">
                            Email: {data?.email ?? "johnDoe@gmail.com"}
                        </p>
                    </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-primary">Personal Information</h3>

                <div className="mb-6 flex flex-col justify-between gap-4 md:grid md:grid-cols-2  ">
                    <Input
                        required
                        name="firstName"
                        label="First Name"
                        register={register}
                        placeholder="Enter your first name"
                        error={errors?.firstName ? errors.firstName.message : undefined}
                        readOnly={profileMode === "view" ? true : false}
                    />

                    <Input
                        required
                        name="lastName"
                        label="Last Name"
                        register={register}
                        placeholder="Enter your last name"
                        error={errors?.lastName ? errors.lastName.message : undefined}
                        readOnly={profileMode === "view" ? true : false}
                    />

                    <Input
                        name="otherName"
                        label="Other Name"
                        register={register}
                        placeholder="Enter your Other name"
                        error={errors?.otherName ? errors.otherName.message : undefined}
                        readOnly={profileMode === "view" ? true : false}
                    />

                    <Input
                        name="email"
                        type="email"
                        label="Email Adddress"
                        register={register}
                        placeholder="Enter your Email Address"
                        error={errors?.email ? errors.email.message : undefined}
                        disabled
                    />

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        register={register}
                        placeholder="Enter your Password"
                        error={errors?.password ? errors.password.message : undefined}
                        readOnly={profileMode === "view" ? true : false}
                    />
                </div>

                {profileMode === "edit" && (
                    <div className="flex items-center gap-4">
                        <Button variant="contained" label="Save Changes" type="submit" />

                        <Button
                            variant="outlined"
                            label="Cancel"
                            onClick={() => {
                                setProfileMode("view")
                            }}
                        />
                    </div>
                )}

                {profileMode === "view" && (
                    <Button
                        variant="contained"
                        label="Edit Profile"
                        onClick={() => {
                            setProfileMode("edit")
                        }}
                    />
                )}
            </form>
        </div>
    )
}

export default Profile
