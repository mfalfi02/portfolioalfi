import type { UserProfile } from '@/types';
import PortfolioHero from '@/components/ui/portfolio-hero';

export default function HeroSection({ profile }: { profile: UserProfile }) {
  return <PortfolioHero profile={profile} />;
}
