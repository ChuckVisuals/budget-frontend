import Card from "../components/card";
import WideCard from "../components/wideCard";
import Navbar from "../components/navbar";

export default function Home() {

    const mock = { income: 1000, amount: 1000 };
    return (

        <div className="relative bg-white h-screen w-screen overflow-hidden">

            <Navbar />


            {/* <div className="mt-6 ml-4">
                <WideCard />
            </div> */}

            <div className="flex items-center mt-10 ml-4 space-x-4">
                <Card prop={mock} />
                <Card prop={mock} />
                <Card prop={mock} />
            </div>

            <div className="mt-6 ml-4">
                <WideCard />
            </div>
        </div>
    )
}
