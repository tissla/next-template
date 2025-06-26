import ThemeToggle from '@/components/ThemeButton';

export default function Home() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-bold text-primary">🎨 Theme color tests</h1>
      <ThemeToggle />

      <p className="text-foreground">Testview for colors.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-xl p-4 bg-background text-foreground shadow">
          <strong>Background</strong>
          <p>bg-background + text-foreground</p>
        </div>
        <div className="rounded-xl p-4 bg-primary text-foreground shadow">
          <strong>Primary</strong>
          <p>bg-primary</p>
        </div>
        <div className="rounded-xl p-4 bg-secondary text-foreground shadow">
          <strong>Secondary</strong>
          <p>bg-secondary</p>
        </div>
        <div className="rounded-xl p-4 bg-accent text-foreground shadow">
          <strong>Accent</strong>
          <p>bg-accent</p>
        </div>
        <div className="rounded-xl p-4 bg-muted text-foreground shadow">
          <strong>Muted</strong>
          <p>bg-muted</p>
        </div>
        <div className="rounded-xl p-4 bg-foreground text-background shadow">
          <strong>Inverted</strong>
          <p>bg-foreground + text-background</p>
        </div>
      </div>
    </div>
  );
}
