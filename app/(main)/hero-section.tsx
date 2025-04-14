'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
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
        <div className="relative h-screen">
            <div className="fixed inset-0 overflow-hidden select-none" style={{ userSelect: 'none' }}>
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
                <Link href="/about" className="block">
                    <Card
                        className="mx-auto max-w-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all cursor-pointer"
                    >
                        <CardContent className="p-8 text-center flex flex-row justify-between items-center">
                            <div className="text-2xl md:text-3xl text-left">
                                See how WebPres,
                                <br />
                                can grow your brand.
                            </div>

                            <div className="flex justify-end">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                                    aria-hidden="true"
                                >
                                    <span className="text-xl">→</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
} 