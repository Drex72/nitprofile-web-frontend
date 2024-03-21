import { Button } from "@/components/ui/Button"
import { getAsset } from "@/utils"
import Image from "next/image"

const Profile = () => {
    return (
        <section className="flex h-full flex-col items-center justify-center">
            <Image src={getAsset("rocket.svg", "images")} alt="Rocket svg" width={280} height={280} />

            <p className="my-6 max-w-[32rem] text-center">
                You haven&apos;t generated a profile yet for this program. Click the button below to generate your
                profile.
            </p>

            <Button label="Generate Profile" variant="contained" />
        </section>
    )
}
export default Profile
