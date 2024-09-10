import Card from "../components/card";
import WideCard from "../components/wideCard";

export default function Home() {
    return (
        <div className="bg-white h-screen w-screen overflow-hidden">
            <div className="mt-6 ml-4">
                <WideCard />
            </div>

            <div className="flex items-center mt-10 ml-4 space-x-4">
                <Card />
                <Card />
                <Card />
            </div>

            <div className="mt-6 ml-4">
                <WideCard />
            </div>

        </div>
    )
}
