import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "../ui/button";

interface PricingCardProps {
    title: string;
    price: string;
    description?: string;
    features: string[];
    isPopular?: boolean;
    isPrimary?: boolean;
    priceSubtext?: string;
    isEnterprise?: boolean;
}

export function PricingCard({
    title,
    price,
    description,
    features,
    isPopular = false,
    isPrimary = false,
    priceSubtext = "",
    isEnterprise = false
}: PricingCardProps) {
    return (
        <Card className={`relative rounded-sm ${isPopular ? "border-2 border-primary/50 lg:scale-110" : ""} ${isEnterprise ? "bg-black text-white" : ""}`}>
            {isPopular && (
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    Most Popular
                </div>
            )}
            <CardHeader>
                <CardTitle className={`text-xl ${isEnterprise ? "text-white" : ""}`}>{title}</CardTitle>
                <CardDescription className={`text-3xl font-bold ${isEnterprise ? "text-white" : ""}`}>
                    {price}
                    {priceSubtext && <span className="ml-1 text-sm font-normal">{priceSubtext}</span>}
                </CardDescription>
                {description && (
                    <CardDescription className={`mt-2 ${isEnterprise ? "text-white/80" : ""}`}>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className={isEnterprise ? "text-white" : "text-primary"}>✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
                <Button variant={isEnterprise ? "secondary" : isPrimary ? "default" : "outline"} className={`w-full mt-6 py-2 rounded-md ${
                    isEnterprise 
                        ? "bg-white text-black hover:bg-white/90" 
                        : isPrimary
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                }`}>
                    {isEnterprise ? "CONTACT" : "TRY IT NOW"}
                </Button>
            </CardContent>
        </Card>
    );
}