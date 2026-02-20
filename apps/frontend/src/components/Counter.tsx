import { createSignal } from "solid-js";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button
      class=" bg-black text-white w-fit"
      onClick={() => setCount(count() + 1)}
      type="button"
    >
      Web Clicks: {count()}
    </button>
  );
}
