import { Button } from "@/components/ui/Button"
import { getAsset } from "@/utils"
import Image from "next/image"

const Certificate = () => {
    return (
        <section className="flex h-full flex-col items-center justify-center">
            <Image src={getAsset("rocket.svg", "images")} alt="Rocket svg" width={280} height={280} />

            <p className="my-6 max-w-[32rem] text-center">
                There is no Certificate Frame for this Program. Click the button below to Upload a Certificate Frame for
                this program.
            </p>

            <Button label="Upload Certificate Frame" variant="contained" />
        </section>
    )
}

export default Certificate
