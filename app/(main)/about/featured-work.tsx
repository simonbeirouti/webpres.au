import { cn } from "@/lib/utils";

interface WorkItem {
    name: string;
    image: string;
    tasks: string[];
}

export default function FeaturedWork() {
    const works = [
        {
            name: "Coin Fi Console",
            image: "/works/coin-fi-console.jpg",
            tasks: [
                'custom website',
                'authentication',
                'game'
            ]
        },
        {
            name: "Coin Fi",
            image: "/works/coin-fi.jpg",
            tasks: [
                'custom website',
                'authentication',
                'game'
            ]
        },
        {
            name: "Oh Banh Mi",
            image: "/works/ohbanhmi.png",
            tasks: [
                'e-commerce',
                'animations',
                'modern'
            ]
        },
        {
            name: "CWscales",
            image: "/works/cwscales.jpg",
            tasks: [
                'cms',
                'custom website',
                'seo optimisation'
            ]
        },
        {
            name: "Mortgage Fishing",
            image: "/works/mortgage-fishing.jpg",
            tasks: [
                'wordpress',
                'ai integration'
            ]
        },
    ];

    const WorkRow = ({ work, reverse = false }: { work: WorkItem; reverse?: boolean }) => {
        const SingleWork = () => (
            <div className="flex items-center">
                <span className="text-5xl md:text-7xl font-light px-4 uppercase">{work.name}</span>
                <div className="w-[200px] h-[100px] md:w-[300px] md:h-[150px] mx-4 rounded-lg overflow-hidden">
                    <img
                        src={work.image}
                        alt={`${work.name} preview`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        );

        const animationClasses = cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            reverse ? "animate-marquee-right" : "animate-marquee-left"
        );

        return (
            <div className={cn(
                "group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                "hover:[animation-play-state:paused]"
            )}>
                <div className={animationClasses}>
                    {Array(4).fill(0).map((_, i) => (
                        <SingleWork key={i} />
                    ))}
                </div>
                <div className={animationClasses}>
                    {Array(4).fill(0).map((_, i) => (
                        <SingleWork key={`duplicate-${i}`} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="bg-white text-black/80 relative overflow-hidden min-h-[800px] pb-24">
            <div className="flex flex-col justify-center gap-16">
                {works.map((work, index) => (
                    <WorkRow key={work.name} work={work} reverse={index % 2 === 0} />
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
        </section>
    );
}