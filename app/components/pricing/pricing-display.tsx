import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { pricing } from "~/data/pricing";
import { PricingCard } from "./pricing-card";

interface Package {
    name: string;
    priceRange: string;
    description: string;
    features: string[];
}

interface Service {
    name: string;
    description: string;
    packages: Package[];
}

export default function PricingDisplay() {
    const mainServices = Object.entries(pricing.pricingStructures).filter(
        ([key]) => key !== 'alternativePricing'
    ) as [string, Service][];

    const subscriptionTiers = pricing.pricingStructures.alternativePricing.subscriptionModel.tiers;

    return (
        <div className="container mx-auto py-12">
            <Tabs defaultValue="websiteDevelopment" className="w-full">
                <TabsList className="grid w-2/3 mx-auto grid-cols-4">
                    <TabsTrigger value="websiteDevelopment">Website</TabsTrigger>
                    <TabsTrigger value="web3Services">Web3</TabsTrigger>
                    <TabsTrigger value="aiDevelopment">AI</TabsTrigger>
                    <TabsTrigger value="designBranding">Design</TabsTrigger>
                </TabsList>

                {mainServices.map(([key, service]) => (
                    <TabsContent key={key} value={key}>
                        <div className="space-y-4 p-4">
                            <div className="text-center mb-12 lg:mb-20 mt-6">
                                <h2 className="text-3xl font-bold">{service.name}</h2>
                                <p className="text-muted-foreground mt-2">{service.description}</p>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                                {service.packages.map((pkg: Package, index: number) => (
                                    <PricingCard
                                        key={pkg.name}
                                        title={pkg.name}
                                        price={pkg.priceRange}
                                        description={pkg.description}
                                        features={pkg.features}
                                        isPopular={index === 1}
                                        isPrimary={index === 1}
                                        isEnterprise={index === 2}
                                    />
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <Tabs defaultValue="monthly" className="w-full mt-32">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold">Subscription Pricing</h2>
                    <p className="text-muted-foreground">Short-term and consistent option for your business</p>
                </div>
                <div className="relative w-[300px] mx-auto z-10 mb-16 mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="monthly" className="relative px-8">
                            Monthly
                        </TabsTrigger>
                        <TabsTrigger value="yearly" className="relative px-8">
                            Yearly
                            <span className="z-0 absolute -top-5 left-2/3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap rotate-15">
                                2 months free
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="monthly" className="mt-4 p-4">
                    <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                        {subscriptionTiers.map((tier) => (
                            <PricingCard
                                key={tier.name}
                                title={tier.name.replace(" Tier", "")}
                                price={tier.monthlyPrice.split("/")[0]}
                                priceSubtext="/ month"
                                description={tier.description}
                                features={tier.features}
                                isPopular={tier.name === "Growth Tier"}
                                isPrimary={tier.name === "Growth Tier"}
                                isEnterprise={tier.name.toLowerCase().includes('enterprise')}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="yearly" className="mt-4 p-4">
                    <div className="grid lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
                        {subscriptionTiers.map((tier) => (
                            <PricingCard
                                key={tier.name}
                                title={tier.name.replace(" Tier", "")}
                                price={tier.yearlyPrice.split("/")[0]}
                                priceSubtext="/ year"
                                description={tier.description}
                                features={tier.features}
                                isPopular={tier.name === "Growth Tier"}
                                isPrimary={tier.name === "Growth Tier"}
                                isEnterprise={tier.name.toLowerCase().includes('enterprise')}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}