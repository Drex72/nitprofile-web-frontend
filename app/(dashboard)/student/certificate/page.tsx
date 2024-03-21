import { Button } from "@/components/ui/Button"
import { getAsset } from "@/utils"
import Image from "next/image"

const Certificate = () => {
    return (
        <section className="flex h-full flex-col items-center justify-center">
            <Image src={getAsset("rocket.svg", "images")} alt="Rocket svg" width={280} height={280} />

            <p className="my-6 max-w-[32rem] text-center">
                You haven&apos;t generated a Certificate yet for this program. Click the button below to generate your
                Certificate.
            </p>

            <Button label="Generate Certificate" variant="contained" />
        </section>
    )
}

export default Certificate
