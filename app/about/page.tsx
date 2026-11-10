import type { Metadata } from 'next';
import AboutTerminal from '../../src/component/terminal/AboutTerminal';

export const metadata: Metadata = {
  title: 'About — Steve Johanes',
  description:
    'About Steve Johanes: background, education, experience, and career goals as a Full Stack Developer and SEO Analyst.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <AboutTerminal />
    </div>
  );
}