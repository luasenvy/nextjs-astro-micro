import "styles/callout.scss";

interface CalloutProps {
  type: "default" | "info" | "warning" | "error";
}

const emojiMap = new Map([
  ["info", "ℹ️"],
  ["warning", "⚠️"],
  ["error", "🚨"],
]);

export default function Callout({ type }: CalloutProps) {
  return (
    <div className={`not-prose callout callout-${type}`}>
      <span className="emoji pointer-events-none select-none">{emojiMap.get(type) ?? "💡"}</span>
      <slot />
    </div>
  );
}
