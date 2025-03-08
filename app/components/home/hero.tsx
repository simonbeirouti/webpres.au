import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { useSection } from "~/hooks/useSection";

export default function Hero() {
    const { scrollToNextSection } = useSection()
    const [filledIndices, setFilledIndices] = useState<number[]>([]);
    const [currentColors, setCurrentColors] = useState<string[]>([]);

    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
        '#E74C3C', '#2ECC71', '#F1C40F', '#1ABC9C'
    ];

    useEffect(() => {
        const numFilled = Math.floor(Math.random() * 2) + 1;
        const indices = new Set<number>();
        while (indices.size < numFilled) {
            indices.add(Math.floor(Math.random() * 8));
        }
        setFilledIndices(Array.from(indices));

        setCurrentColors(Array(8).fill('').map(() =>
            colors[Math.floor(Math.random() * colors.length)]
        ));

        const intervalId = setInterval(() => {
            setCurrentColors(prevColors =>
                prevColors.map(() => colors[Math.floor(Math.random() * colors.length)])
            );

            const newNumFilled = Math.floor(Math.random() * 2) + 1;
            const newIndices = new Set<number>();
            while (newIndices.size < newNumFilled) {
                newIndices.add(Math.floor(Math.random() * 8));
            }
            setFilledIndices(Array.from(newIndices));
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative h-screen snap-start pt-[64px]">
            <div className="absolute inset-0 overflow-hidden select-none" style={{ userSelect: 'none' }}>
                <div className="h-full flex flex-col justify-between">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className={`text-[120px] md:text-[180px] font-bold leading-[0.85]`}
                            style={{
                                WebkitTextStroke: filledIndices.includes(i) ? 'none' : '0.5px black',
                                color: filledIndices.includes(i) ? currentColors[i] : 'white',
                                opacity: 0.5,
                                whiteSpace: 'nowrap',
                                transition: 'color 0.5s ease'
                            }}
                        >
                            WebPres WebPres WebPres WebPres WebPres
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-20 left-0 right-0 z-10 px-8">
                <Card
                    onClick={scrollToNextSection}
                    className="mx-auto max-w-xl cursor-pointer bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all"
                >
                    <CardContent className="p-8 text-center">
                        <div className="text-2xl md:text-3xl mb-8">
                            See how WebPres,
                            <br />
                            can grow your brand.
                        </div>

                        <div
                            className="animate-bounce flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mx-auto"
                            aria-label="Scroll to next section"
                        >
                            ↓
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 