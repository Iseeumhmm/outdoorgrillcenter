/**
 * Browse by Type Section Component
 * Displays category cards for different grill types with appropriate icons
 */

/**
 * Main Browse by Type Section
 */
export default function BrowseByType() {
  return (
    <div className="mt-16 border-t border-bbq-cream pt-12 dark:border-gray-800">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
        Browse by Type
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <BrowseTypeCard type="pellet-grill" label="Pellet Grills" iconType="pellet" />
        <BrowseTypeCard type="gas-grill" label="Gas Grills" iconType="gas" />
        <BrowseTypeCard type="charcoal" label="Charcoal Grills" iconType="charcoal" />
        <BrowseTypeCard type="kamado" label="Kamado Grills" iconType="kamado" />
        <BrowseTypeCard type="electric" label="Electric Grills" iconType="electric" />
        <BrowseTypeCard type="portable" label="Portable Grills" iconType="portable" />
        <BrowseTypeCard type="smoker" label="Smokers" iconType="smoker" />
      </div>
    </div>
  )
}

/**
 * Browse by Type Card Component
 */
function BrowseTypeCard({ type, label, iconType }) {
  return (
    <a
      href={`/reviews/type/${type}`}
      className="group flex flex-col items-center gap-3 rounded-lg border border-bbq-charcoal bg-white p-6 text-center transition-all hover:border-bbq-fire hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-bbq-fire"
    >
      <GrillIcon type={iconType} />
      <span className="font-semibold text-gray-900 group-hover:text-bbq-fire dark:text-white">
        {label}
      </span>
    </a>
  )
}

/**
 * Grill Icon Component - Returns appropriate SVG icon for each grill type
 */
function GrillIcon({ type }) {
  const iconClass =
    'h-12 w-12 text-gray-600 group-hover:text-bbq-fire dark:text-gray-400 transition-colors'

  switch (type) {
    case 'pellet':
      // Pellet Grill - represents hopper and pellet feed system
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12h18M3 6h18M3 18h18"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12v6M16 12v6M12 6v12"
          />
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <circle cx="12" cy="20" r="2" fill="currentColor" />
        </svg>
      )

    case 'gas':
      // Gas Grill - represents gas burner flames
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 2c-1.5 3-2 5-2 7 0 2.5 2 4.5 4.5 4.5S19 11.5 19 9c0-2-.5-4-2-7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9c-1 2-1.5 3.5-1.5 5 0 2 1.5 3.5 3.5 3.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 18h18v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"
          />
        </svg>
      )

    case 'charcoal':
      // Charcoal Grill - represents coal/briquettes
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 10l-1.5 2L5 10l1.5-2L8 10zm3-4l-2 3 2 3 2-3-2-3zm5 4l-1.5 2L13 10l1.5-2L16 10zm-8 5l-1.5 2L5 15l1.5-2L8 15zm5 0l-1.5 2L10 15l1.5-2L13 15zm5 0l-1.5 2L15 15l1.5-2L18 15z" />
          <path d="M2 19h20v2H2v-2z" opacity="0.7" />
        </svg>
      )

    case 'kamado':
      // Kamado Grill - egg-shaped ceramic grill
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <ellipse cx="12" cy="14" rx="7" ry="8" strokeWidth={1.5} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v2M5 14h14M8 18h8"
          />
          <rect x="10" y="2" width="4" height="3" rx="1" strokeWidth={1.5} />
        </svg>
      )

    case 'electric':
      // Electric Grill - heating element
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 20h20" />
        </svg>
      )

    case 'portable':
      // Portable Grill - compact grill with handle
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="4" y="10" width="16" height="8" rx="1" strokeWidth={1.5} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 14h16M8 14v4M16 14v4M10 6h4a2 2 0 012 2v2h-8V8a2 2 0 012-2z"
          />
        </svg>
      )

    case 'smoker':
      // Smoker - vertical smoker with smoke
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="6" y="8" width="12" height="12" rx="1" strokeWidth={1.5} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 14h12M10 8V6c0-1 .5-2 1.5-2M14 8V6c0-1-.5-2-1.5-2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 3c.5-.5 1-1 1.5-1M15 3c-.5-.5-1-1-1.5-1"
            opacity="0.5"
          />
          <circle cx="9" cy="11" r="0.5" fill="currentColor" />
          <circle cx="12" cy="11" r="0.5" fill="currentColor" />
          <circle cx="15" cy="11" r="0.5" fill="currentColor" />
        </svg>
      )

    default:
      return null
  }
}
