export default function FeaturedWork() {
    const works = [
        {
            name: "Oh Banh Mi",
            image: "/works/ohbanhmi.png",
        },
        {
            name: "CWscales",
            image: "/works/cwscales.jpg",
        },
        {
            name: "Mortgage Fishing",
            image: "/works/mortgage-fishing.jpg",
        },
    ];

    const generateRepeatingPattern = (work: typeof works[0]) => {
        const pattern = Array(8).fill(null).map((_, i) => (
            <div key={i} className="flex items-center">
                <span className="text-5xl md:text-7xl font-light px-4 uppercase">{work.name}</span>
                <div className="w-[200px] h-[100px] md:w-[300px] md:h-[150px] mx-4 rounded-[2rem] overflow-hidden">
                    <img
                        src={work.image}
                        alt={`${work.name} preview`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        ));
        return pattern;
    };

    return (
        <section className="h-screen bg-white text-black/40 snap-start overflow-hidden relative">
            <div className="absolute inset-0 flex flex-col justify-center gap-16">
                {works.map((work, index) => (
                    <div key={index} className="flex items-center whitespace-nowrap animate-scroll">
                        <div className="flex">
                            {generateRepeatingPattern(work)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}