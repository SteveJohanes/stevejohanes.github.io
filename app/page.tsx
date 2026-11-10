import type { Metadata } from 'next';
import Terminal from '../src/component/terminal/Terminal';

export const metadata: Metadata = {
  title: 'Steve Johanes — Full Stack Developer & SEO Analyst',
  description:
    'Terminal-style portfolio of Steve Johanes: Flutter, Laravel, Next.js, and SEO.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Terminal />
    </div>
  );
}