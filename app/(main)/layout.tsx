import Footer from '@/components/footer';
import Navigation from '@/components/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navigation />
        {children}
      <Footer />
    </section>
  );
}
