import { cx } from "@/utils/all";

/**
 * ProductTypeBadge Component
 * Displays a color-coded badge for product types (gas grill, pellet grill, etc.)
 *
 * @param {string} productType - Product type slug (e.g., 'pellet-grill', 'gas-grill')
 * @param {string} className - Additional CSS classes
 */
export default function ProductTypeBadge({ productType, className = "" }) {
  if (!productType) return null;

  const typeConfig = getProductTypeConfig(productType);

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        typeConfig.colors,
        className
      )}
    >
      {typeConfig.icon && (
        <span className="mr-1">{typeConfig.icon}</span>
      )}
      {typeConfig.label}
    </span>
  );
}

/**
 * Get color scheme and label for each product type
 */
function getProductTypeConfig(productType) {
  const configs = {
    "pellet-grill": {
      label: "Pellet Grill",
      colors: "bg-[#FF6F00]/10 text-[#FF6F00] border border-[#FF6F00]/20 dark:bg-[#FF6F00]/20 dark:text-[#FF6F00] dark:border-[#FF6F00]/30",
      icon: null
    },
    "gas-grill": {
      label: "Gas Grill",
      colors: "bg-[#D32F2F]/10 text-[#D32F2F] border border-[#D32F2F]/20 dark:bg-[#D32F2F]/20 dark:text-[#D32F2F] dark:border-[#D32F2F]/30",
      icon: null
    },
    "charcoal": {
      label: "Charcoal",
      colors: "bg-[#2D2D2D]/10 text-[#2D2D2D] border border-[#2D2D2D]/20 dark:bg-gray-300/20 dark:text-gray-200 dark:border-gray-300/30",
      icon: null
    },
    "kamado": {
      label: "Kamado",
      colors: "bg-[#6D4C41]/10 text-[#6D4C41] border border-[#6D4C41]/20 dark:bg-[#6D4C41]/20 dark:text-[#A1887F] dark:border-[#6D4C41]/30",
      icon: null
    },
    "electric": {
      label: "Electric",
      colors: "bg-[#FFA726]/10 text-[#F57C00] border border-[#FFA726]/20 dark:bg-[#FFA726]/20 dark:text-[#FFA726] dark:border-[#FFA726]/30",
      icon: null
    },
    "portable": {
      label: "Portable",
      colors: "bg-[#7CB342]/10 text-[#7CB342] border border-[#7CB342]/20 dark:bg-[#7CB342]/20 dark:text-[#7CB342] dark:border-[#7CB342]/30",
      icon: null
    },
    "smoker": {
      label: "Smoker",
      colors: "bg-[#9E9E9E]/10 text-[#9E9E9E] border border-[#9E9E9E]/20 dark:bg-[#9E9E9E]/20 dark:text-[#9E9E9E] dark:border-[#9E9E9E]/30",
      icon: null
    }
  };

  // Return config or default
  return configs[productType] || {
    label: formatProductType(productType),
    colors: "bg-[#9E9E9E]/10 text-[#9E9E9E] border border-[#9E9E9E]/20 dark:bg-gray-700/20 dark:text-gray-200 dark:border-gray-700/30",
    icon: null
  };
}

/**
 * Format product type slug to readable label
 * e.g., 'pellet-grill' -> 'Pellet Grill'
 */
function formatProductType(slug) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
