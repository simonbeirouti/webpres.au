import { cn } from "~/lib/utils";
import { BentoGrid, BentoGridItem } from "./bento";
import { Bitcoin, Bot, Brush, EthernetPort } from "lucide-react";
import { Web3Services, AIDevelopment, WebsiteDevelopment, DesignServices } from "../services/skeletons";

const items = [
    {
        title: "Modern Website Development",
        description: "Creating responsive, user-focused websites that deliver exceptional experiences",
        header: <WebsiteDevelopment />,
        className: "md:col-span-1",
        icon: <EthernetPort className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "AI Development and Services",
        description: "Harness the power of artificial intelligence to elevate your digital presence",
        header: <AIDevelopment />,
        className: "md:col-span-2",
        icon: <Bot className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Web3 Services",
        description: "Step into the future of the internet with our Web3 solutions",
        header: <Web3Services />,
        className: "md:col-span-2",
        icon: <Bitcoin className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Design and Branding Services",
        description: "Creating cohesive brand experiences that resonate across all digital touchpoints",
        header: <DesignServices />,
        className: "md:col-span-1",
        icon: <Brush className="h-4 w-4 text-neutral-500" />,
    },
];

export default function BentoGridArea() {
    return (
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] px-4 pt-4 xl:pt-12 pb-24 md:pb-36">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg]", item.className)}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}
