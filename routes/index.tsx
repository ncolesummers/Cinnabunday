import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal({});
  return (
    <div class="px-4 py-8 mx-auto bg-[#F2DB83]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Movie Night</h1>
        <Counter count={count} />
      </div>
    </div>
  );
}
