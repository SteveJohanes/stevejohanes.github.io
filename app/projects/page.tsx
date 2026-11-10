import type { Metadata } from 'next';
import ProjectsTerminal from '../../src/component/terminal/ProjectsTerminal';

export const metadata: Metadata = {
  title: 'Projects — Steve Johanes',
  description:
    'Projects by Steve Johanes: cashier app, Tahura visitor app, PC-build store, Streamdex, and Panelia.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <ProjectsTerminal />
    </div>
  );
}