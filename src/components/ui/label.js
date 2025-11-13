import { cx } from "@/utils/all";

export default function Label(props) {
  // BBQ-themed color palette using project theme colors
  const color = {
    green: "text-bbq-green",
    red: "text-bbq-fire",
    orange: "text-bbq-orange",
    amber: "text-bbq-amber",
    brown: "text-bbq-brown",
    gray: "text-bbq-gray",
    charcoal: "text-bbq-charcoal"
  };
  const bgcolor = {
    green: "bg-bbq-green/10",
    red: "bg-bbq-fire/10",
    orange: "bg-bbq-orange/10",
    amber: "bg-bbq-amber/10",
    brown: "bg-bbq-brown/10",
    gray: "bg-bbq-gray/10",
    charcoal: "bg-bbq-charcoal/10"
  };
  const margin = props.nomargin;

  if (props.pill) {
    return (
      <div
        className={
          "inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-bbq-fire/10 text-bbq-fire rounded-full shrink-0 dark:bg-gray-800 dark:text-gray-300"
        }>
        {props.children}
      </div>
    );
  }

  return (
    <span
      className={cx(
        "inline-block text-xs font-medium tracking-wider uppercase ",
        !margin && " mt-5",
        color[props.color] ?? color["red"]
      )}>
      {props.children}
    </span>
  );
}
