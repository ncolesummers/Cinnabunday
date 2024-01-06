import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  count: Signal<Movie>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex flex-col gap-4 py-6">
      <Button onClick={() => window.open("https://example.com")}>
        Full Metal Jacket
      </Button>
      <Button onClick={() => window.open("https://example.com")}>
        Get Out
      </Button>
    </div>
  );
}
