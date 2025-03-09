import { cn } from "~/lib/utils";
import { BentoGrid, BentoGridItem } from "./bento";
import { Bitcoin, Bot, Brush, EthernetPort } from "lucide-react";
import { Web3Services, AIDevelopment, WebsiteDevelopment, DesignServices } from "../services/skeletons";

const items = [
    {
        title: "Modern Website Development",
        id: "website-development",
        description: "Creating responsive, user-focused websites that deliver exceptional experiences",
        header: <WebsiteDevelopment />,
        className: "md:col-span-1",
        icon: <EthernetPort className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "AI Development and Services",
        id: "ai-services",
        description: "Harness the power of artificial intelligence to elevate your digital presence",
        header: <AIDevelopment />,
        className: "md:col-span-2",
        icon: <Bot className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Web3 Services",
        id: "web3-services",
        description: "Step into the future of the internet with our Web3 solutions",
        header: <Web3Services />,
        className: "md:col-span-2",
        icon: <Bitcoin className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Design and Branding Services",
        id: "design-services",
        description: "Creating cohesive brand experiences that resonate across all digital touchpoints",
        header: <DesignServices />,
        className: "md:col-span-1",
        icon: <Brush className="h-4 w-4 text-neutral-500" />,
    },
];

export default function BentoGridArea() {
    return (
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] px-4">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    id={item.id}
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
