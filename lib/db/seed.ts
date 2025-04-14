import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  // Website Development Packages
  const basicWebsite = await stripe.products.create({
    name: 'Basic Website Package',
    description: 'Perfect for small businesses and startups looking to establish their online presence with a professional, functional website.',
  });

  await stripe.prices.create({
    product: basicWebsite.id,
    unit_amount: 250000, // $2,500 in cents
    currency: 'aud',
  });

  const professionalWebsite = await stripe.products.create({
    name: 'Professional Website Package',
    description: 'Ideal for growing businesses needing a comprehensive web presence with e-commerce capabilities and advanced marketing features.',
  });

  await stripe.prices.create({
    product: professionalWebsite.id,
    unit_amount: 500000, // $5,000 in cents
    currency: 'aud',
  });

  const enterpriseWebsite = await stripe.products.create({
    name: 'Enterprise Website Package',
    description: 'A complete solution for large organizations requiring complex functionality, extensive customization, and ongoing support.',
  });

  await stripe.prices.create({
    product: enterpriseWebsite.id,
    unit_amount: 1000000, // $10,000 in cents
    currency: 'aud',
  });

  // Web3 Services Packages
  const starterWeb3 = await stripe.products.create({
    name: 'Starter Web3 Package',
    description: 'Perfect for businesses looking to enter the Web3 space with essential blockchain functionality and decentralized applications.',
  });

  await stripe.prices.create({
    product: starterWeb3.id,
    unit_amount: 500000, // $5,000 in cents
    currency: 'aud',
  });

  const advancedWeb3 = await stripe.products.create({
    name: 'Advanced Web3 Package',
    description: 'Ideal for companies requiring sophisticated Web3 solutions with custom tokens, enhanced security, and advanced functionality.',
  });

  await stripe.prices.create({
    product: advancedWeb3.id,
    unit_amount: 1000000, // $10,000 in cents
    currency: 'aud',
  });

  const enterpriseWeb3 = await stripe.products.create({
    name: 'Enterprise Web3 Package',
    description: 'A comprehensive Web3 solution for organizations needing complex blockchain infrastructure, marketplaces, and ongoing support.',
  });

  await stripe.prices.create({
    product: enterpriseWeb3.id,
    unit_amount: 2500000, // $25,000 in cents
    currency: 'aud',
  });

  // AI Development Packages
  const aiEssentials = await stripe.products.create({
    name: 'AI Essentials Package',
    description: 'Perfect for businesses looking to start their AI journey with essential automation and intelligence features.',
  });

  await stripe.prices.create({
    product: aiEssentials.id,
    unit_amount: 300000, // $3,000 in cents
    currency: 'aud',
  });

  const aiProfessional = await stripe.products.create({
    name: 'AI Professional Package',
    description: 'Ideal for growing companies needing sophisticated AI solutions with advanced analytics and custom development.',
  });

  await stripe.prices.create({
    product: aiProfessional.id,
    unit_amount: 700000, // $7,000 in cents
    currency: 'aud',
  });

  const aiEnterprise = await stripe.products.create({
    name: 'AI Enterprise Package',
    description: 'A comprehensive AI solution for organizations requiring multiple advanced AI implementations and ongoing optimization.',
  });

  await stripe.prices.create({
    product: aiEnterprise.id,
    unit_amount: 1500000, // $15,000 in cents
    currency: 'aud',
  });

  // Design and Branding Packages
  const brandStarter = await stripe.products.create({
    name: 'Brand Starter Package',
    description: 'Perfect for new businesses and startups looking to establish their initial brand identity with essential design elements.',
  });

  await stripe.prices.create({
    product: brandStarter.id,
    unit_amount: 200000, // $2,000 in cents
    currency: 'aud',
  });

  const brandProfessional = await stripe.products.create({
    name: 'Brand Professional Package',
    description: 'Ideal for growing businesses that need a comprehensive brand package with marketing materials and digital assets.',
  });

  await stripe.prices.create({
    product: brandProfessional.id,
    unit_amount: 400000, // $4,000 in cents
    currency: 'aud',
  });

  const brandEnterprise = await stripe.products.create({
    name: 'Brand Enterprise Package',
    description: 'A complete branding solution for established businesses requiring sophisticated design systems and ongoing creative support.',
  });

  await stripe.prices.create({
    product: brandEnterprise.id,
    unit_amount: 800000, // $8,000 in cents
    currency: 'aud',
  });

  // Subscription Products
  const basicSubscription = await stripe.products.create({
    name: 'Basic Subscription Tier',
    description: 'Perfect for small businesses needing essential website maintenance and support.',
  });

  // Monthly price for Basic tier
  await stripe.prices.create({
    product: basicSubscription.id,
    unit_amount: 50000, // $500 in cents
    currency: 'aud',
    recurring: {
      interval: 'month',
    },
  });

  // Yearly price for Basic tier (2 Months free)
  await stripe.prices.create({
    product: basicSubscription.id,
    unit_amount: 500000, // $5,000 in cents ($416.67/month equivalent)
    currency: 'aud',
    recurring: {
      interval: 'year',
    },
  });

  const growthSubscription = await stripe.products.create({
    name: 'Growth Subscription Tier',
    description: 'Ideal for growing businesses requiring regular updates and optimization.',
  });

  // Monthly price for Growth tier
  await stripe.prices.create({
    product: growthSubscription.id,
    unit_amount: 100000, // $1,000 in cents
    currency: 'aud',
    recurring: {
      interval: 'month',
    },
  });

  // Yearly price for Growth tier (2 Months free)
  await stripe.prices.create({
    product: growthSubscription.id,
    unit_amount: 1000000, // $10,000 in cents ($833.33/month equivalent)
    currency: 'aud',
    recurring: {
      interval: 'year',
    },
  });

  const enterpriseSubscription = await stripe.products.create({
    name: 'Enterprise Subscription Tier',
    description: 'Comprehensive solution for large organizations needing full-service digital support.',
  });

  // Monthly price for Enterprise tier
  await stripe.prices.create({
    product: enterpriseSubscription.id,
    unit_amount: 250000, // $2,500 in cents
    currency: 'aud',
    recurring: {
      interval: 'month',
    },
  });

  // Yearly price for Enterprise tier (2 Months free)
  await stripe.prices.create({
    product: enterpriseSubscription.id,
    unit_amount: 2500000, // $25,000 in cents ($2,083.33/month equivalent)
    currency: 'aud',
    recurring: {
      interval: 'year',
    },
  });

  console.log('Stripe products and prices created successfully.');
}

async function seed() {
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "owner",
      },
    ])
    .returning();

  console.log('Initial user created.');

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner',
  });

  await createStripeProducts();
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
