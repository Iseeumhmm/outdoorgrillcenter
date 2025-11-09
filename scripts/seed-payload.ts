/**
 * Payload CMS Seed Script - BBQ Review System
 *
 * This script seeds the database with BBQ grill/smoker review data.
 * It creates:
 * - Product images from Unsplash
 * - 1 BBQ expert author
 * - 6 BBQ grill categories
 * - 9 comprehensive product reviews with ratings
 * - Settings with Outdoor Grill Center branding
 *
 * Usage: pnpm seed
 */

import { getPayload } from 'payload'
import config from '@payload-config'

// Unsplash product images
const PRODUCT_IMAGES = {
  author: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop', // Professional chef
  products: [
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200&h=800&fit=crop', // Pellet grill
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop', // BBQ grill
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=800&fit=crop', // Gas grill 2
    'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&h=800&fit=crop', // Kamado grill
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200&h=800&fit=crop', // Pellet grill 2
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop', // Gas grill
    'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=800&fit=crop', // Gas grill 3
    'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&h=800&fit=crop', // Electric smoker
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200&h=800&fit=crop', // Portable grill
  ],
  logo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=60&fit=crop', // Logo
}

async function downloadImageAsFile(url: string, filename: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  return {
    data: buffer,
    mimetype: 'image/jpeg',
    name: filename,
    size: buffer.length,
  }
}

const SAMPLE_BBQ_AUTHOR = {
  name: 'Jake Thompson',
  slug: 'jake-thompson',
  bio: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: "Professional pitmaster with 15+ years of competition BBQ experience. Winner of multiple state championships and passionate about helping home cooks achieve restaurant-quality results. Tests over 50 grills and smokers annually to provide honest, in-depth reviews for the outdoor cooking community.",
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  },
  email: 'jake@outdoorgrillcenter.com',
}

const SAMPLE_BBQ_CATEGORIES = [
  { title: 'Pellet Grills', slug: 'pellet-grills', color: 'orange' as const, description: 'Wood-fired pellet grills and smokers' },
  { title: 'Gas Grills', slug: 'gas-grills', color: 'blue' as const, description: 'Propane and natural gas grills' },
  { title: 'Charcoal Grills', slug: 'charcoal-grills', color: 'green' as const, description: 'Traditional charcoal and BBQ grills' },
  { title: 'Kamado Grills', slug: 'kamado-grills', color: 'purple' as const, description: 'Ceramic kamado-style grills' },
  { title: 'Electric Smokers', slug: 'electric-smokers', color: 'pink' as const, description: 'Electric smokers and vertical smokers' },
  { title: 'Portable Grills', slug: 'portable-grills', color: 'orange' as const, description: 'Compact and portable grilling solutions' },
]

const SAMPLE_PRODUCT_REVIEWS = [
  {
    title: 'Traeger Ironwood 885 Review: Premium WiFi Pellet Grill',
    slug: 'traeger-ironwood-885-review',
    excerpt: 'The Traeger Ironwood 885 delivers exceptional versatility with WiFIRE technology, massive cooking space, and premium build quality that justifies its premium price.',
    rating: 4.5,
    productName: 'Traeger Ironwood 885',
    productBrand: 'Traeger',
    productModel: 'Ironwood 885',
    amazonASIN: 'B07MQKZ4N5',
    productPrice: 1999,
    productType: 'pellet-grill',
    categoryIndex: 0,
    featured: true,
    estReadingTime: 8,
    prosAndCons: {
      pros: [
        { item: 'WiFIRE technology allows remote monitoring and control' },
        { item: 'Massive 885 sq in cooking capacity' },
        { item: 'Super Smoke mode enhances flavor' },
        { item: 'TurboTemp speeds up heating' },
        { item: 'Pellet sensor prevents run-outs' },
        { item: 'Excellent build quality and warranty' },
      ],
      cons: [
        { item: 'Premium price point at $1,999' },
        { item: 'WiFi connectivity can be temperamental' },
        { item: 'Heavy - difficult to move without help' },
        { item: 'Pellets can be expensive long-term' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Introduction' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "The Traeger Ironwood 885 represents the pinnacle of pellet grill technology, combining WiFIRE smart connectivity with Traeger's legendary wood-fired cooking performance. After extensive testing over three months, including everything from low-and-slow briskets to high-heat pizza, this grill has proven itself as a serious contender for serious outdoor cooks.",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'At $1,999, the Ironwood 885 sits in the premium category, competing with high-end kamados and professional gas grills. The question is whether the smart features, cooking capacity, and build quality justify the investment for home cooks and weekend warriors.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Key Specifications' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Cooking area: 885 square inches total' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Temperature range: 165-500°F' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Hopper capacity: 20 pounds of pellets' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Weight: 195 lbs' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Warranty: 3-year limited' }] },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Build Quality & Design' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "The Ironwood 885 feels substantial and well-engineered. The double-wall stainless steel interior provides excellent heat retention and durability. The powder-coated steel exterior resists rust and weathering, while the all-terrain wheels make repositioning manageable despite the 195-pound weight.",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Assembly took approximately 90 minutes with two people. Instructions were clear, and all hardware was included. The pellet sensor and grease management system show thoughtful engineering that separates this from budget pellet grills.",
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Performance & Cooking Tests' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "I tested the Ironwood 885 with a 12-pound brisket at 225°F for 14 hours. Temperature held steady within ±5°F throughout the entire cook. The Super Smoke mode between 165-225°F produced excellent smoke rings and bark development. TurboTemp brought the grill from 225°F to 450°F in just 7 minutes for reverse-searing.",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The 885 square inches of cooking space accommodated 9 full racks of ribs simultaneously using the second rack. Heat distribution was remarkably even - no significant hot or cold spots detected across the main grate.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'WiFIRE Technology' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "The WiFIRE app allows full grill control from your phone - adjusting temperature, monitoring internal meat probes, and receiving alerts. During testing, connectivity was solid about 85% of the time, though occasional disconnects required app restarts. The ability to monitor overnight cooks from bed is genuinely convenient.",
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Ease of Use' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Operation is straightforward - load pellets, set temperature, and let the D2 controller handle the rest. The pellet sensor prevents embarrassing run-outs mid-cook. Start-up takes about 7 minutes from ignition to target temperature.",
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Cleaning & Maintenance' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The grease management system channels drippings into a disposable bucket, making cleanup easy. I vacuum ash from the firepot every 3-4 cooks. Porcelain-coated grates clean with a standard grill brush.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "The Traeger Ironwood 885 delivers on its premium promises. The combination of capacity, smart features, and cooking performance justifies the $1,999 price for serious outdoor cooks who want the convenience of pellet grilling without compromising on results.",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Best for: Families, entertainers, and BBQ enthusiasts who value convenience and capacity. Skip it if: Budget is limited or you prefer traditional charcoal flavor.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    title: 'Pit Boss Sportsman 820 Review: Best Value Pellet Grill',
    slug: 'pit-boss-sportsman-820-review',
    excerpt: 'The Pit Boss Sportsman 820 delivers solid pellet grill performance at a budget-friendly $899, making it an excellent entry point for beginners.',
    rating: 4,
    productName: 'Pit Boss Sportsman 820',
    productBrand: 'Pit Boss',
    productModel: 'Sportsman 820',
    amazonASIN: 'B08GC4QRP8',
    productPrice: 899,
    productType: 'pellet-grill',
    categoryIndex: 0,
    featured: true,
    estReadingTime: 7,
    prosAndCons: {
      pros: [
        { item: 'Excellent value at $899' },
        { item: 'Flame broiler adds direct grilling capability' },
        { item: '820 sq in cooking area' },
        { item: 'Digital control board is user-friendly' },
      ],
      cons: [
        { item: 'Temperature swings of ±15°F' },
        { item: 'Build quality not as refined as premium brands' },
        { item: 'No WiFi connectivity' },
        { item: 'Requires more frequent ash cleaning' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Pit Boss Sportsman 820 proves you don\'t need to spend $2,000 to enjoy pellet grilling. At $899, this grill delivers 820 square inches of cooking space and the unique flame broiler feature that sets Pit Boss apart from competitors.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Performance Testing' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Temperature control is decent but not exceptional. During a 10-hour pork shoulder cook at 250°F, I observed temperature swings between 235-265°F. The flame broiler lever is genuinely useful for searing steaks after smoking.' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The 820 square inches easily handles a whole turkey plus sides. Porcelain-coated grates provide good heat retention and are easy to clean.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Build Quality' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Construction is solid but shows cost-cutting in details - thinner metal, basic paint finish, and plastic components where premium grills use metal. That said, nothing feels unsafe or likely to fail prematurely.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Sportsman 820 is the best value in pellet grilling. Accept slightly wider temperature swings and basic construction in exchange for saving $1,000+ versus premium brands. Perfect for beginners and budget-conscious cooks.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Z Grills 700D Review: Budget Pellet Grill Champion',
    slug: 'z-grills-700d-review',
    excerpt: 'The Z Grills 700D offers impressive 8-in-1 versatility and PID temperature control at just $599, making it the ultimate budget pellet grill.',
    rating: 4.5,
    productName: 'Z Grills Wood Pellet Grill 700D',
    productBrand: 'Z Grills',
    productModel: '700D',
    amazonASIN: 'B07PPNQMHH',
    productPrice: 599,
    productType: 'pellet-grill',
    categoryIndex: 0,
    featured: false,
    estReadingTime: 6,
    prosAndCons: {
      pros: [
        { item: 'Unbeatable value at $599' },
        { item: 'PID controller provides tight temperature control' },
        { item: '8-in-1 versatility (grill, smoke, bake, roast, sear, braise, BBQ, char-grill)' },
        { item: '700 sq in cooking space' },
      ],
      cons: [
        { item: 'Basic construction and materials' },
        { item: 'No WiFi or app control' },
        { item: 'Customer service can be slow' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'At $599, the Z Grills 700D punches well above its weight class. The PID controller maintains temperatures within ±10°F, matching grills costing twice as much. The 700 square inches accommodates family meals and small gatherings easily.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Cooking Performance' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'I smoked ribs at 225°F for 5 hours with excellent results. The automatic auger fed pellets consistently, and the PID controller adjusted heat output to maintain steady temperatures. Smoke production was adequate for good flavor development.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Z Grills 700D is the best entry-level pellet grill available. PID temperature control and 8-in-1 functionality at $599 make this an incredible value. Perfect for first-time pellet grillers.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Kamado Joe Classic III Review: The Perfect Kamado',
    slug: 'kamado-joe-classic-iii-review',
    excerpt: 'The Kamado Joe Classic III sets the gold standard for ceramic kamado grills with the innovative Divide & Conquer system and unmatched versatility.',
    rating: 5,
    productName: 'Kamado Joe Classic III',
    productBrand: 'Kamado Joe',
    productModel: 'Classic III',
    amazonASIN: 'B07RBYQMGS',
    productPrice: 1699,
    productType: 'kamado',
    categoryIndex: 3,
    featured: true,
    estReadingTime: 9,
    prosAndCons: {
      pros: [
        { item: 'Divide & Conquer flexible cooking system is game-changing' },
        { item: 'Excellent temperature control 150-750°F' },
        { item: 'Air Lift hinge makes lid effortless' },
        { item: 'SlōRoller hyperbolic insert for smoking' },
        { item: 'Superior heat retention' },
        { item: 'Lifetime warranty on ceramic' },
      ],
      cons: [
        { item: 'Premium $1,699 price' },
        { item: 'Heavy and not portable' },
        { item: 'Learning curve for charcoal management' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Kamado Joe Classic III is the result of decades of kamado evolution. The Divide & Conquer multi-level cooking system alone justifies the upgrade from previous versions, allowing simultaneous cooking at different heights and temperatures.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Divide & Conquer System' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The three-tier flexible rack system lets you configure cooking zones for different foods. I\'ve simultaneously smoked salmon on the top tier at 225°F while roasting vegetables on the lower tier at 350°F. This versatility is unmatched in the kamado world.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Temperature Control' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Ceramic construction provides thermal mass that holds temperatures rock-steady. I maintained 225°F for 16 hours during a brisket cook with minimal vent adjustments. The kontrol tower top vent allows precise airflow control.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Kamado Joe Classic III is the best kamado grill available. The Divide & Conquer system, Air Lift hinge, and SlōRoller attachment justify the $1,699 price for serious cooks. This is an heirloom-quality cooker that will last decades.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Big Green Egg Large Review: The Original Kamado Legend',
    slug: 'big-green-egg-large-review',
    excerpt: 'The Big Green Egg Large remains the benchmark kamado grill, offering legendary temperature control and a lifetime warranty backed by decades of refinement.',
    rating: 4.5,
    productName: 'Big Green Egg Large',
    productBrand: 'Big Green Egg',
    productModel: 'Large',
    amazonASIN: '',
    productPrice: 1299,
    productType: 'kamado',
    categoryIndex: 3,
    featured: false,
    estReadingTime: 7,
    prosAndCons: {
      pros: [
        { item: 'Legendary brand with proven track record' },
        { item: 'Excellent temperature range 150-750°F' },
        { item: 'Lifetime warranty on ceramic components' },
        { item: '262 sq in cooking area perfect for families' },
        { item: 'Massive accessory ecosystem' },
      ],
      cons: [
        { item: 'Lacks modern innovations like Divide & Conquer' },
        { item: 'Heavy lid without assisted hinge' },
        { item: 'Accessories sold separately add up' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Big Green Egg is the kamado that started it all. The Large model offers 262 square inches of cooking space - enough for a turkey or multiple racks of ribs. After testing for three months, the BGE proves why it remains the benchmark.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Temperature Control' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The thick ceramic walls provide exceptional heat retention. I held 250°F for 14 hours during a pork shoulder cook with only one vent adjustment. The daisy wheel draft door allows precise airflow control once you learn the feel.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Big Green Egg Large is a solid choice at $1,299, though the Kamado Joe Classic III offers more innovation for $400 more. The BGE\'s lifetime warranty and established dealer network provide peace of mind. Best for traditional kamado enthusiasts.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Weber Spirit II E-310 Review: The Gold Standard Gas Grill',
    slug: 'weber-spirit-ii-e310-review',
    excerpt: 'The Weber Spirit II E-310 combines legendary reliability with the innovative GS4 grilling system to deliver the best 3-burner gas grill under $700.',
    rating: 4.5,
    productName: 'Weber Spirit II E-310',
    productBrand: 'Weber',
    productModel: 'Spirit II E-310',
    amazonASIN: 'B01N79WW3R',
    productPrice: 649,
    productType: 'gas-grill',
    categoryIndex: 1,
    featured: false,
    estReadingTime: 6,
    prosAndCons: {
      pros: [
        { item: 'GS4 grilling system for reliable performance' },
        { item: '529 sq in total cooking space' },
        { item: 'Porcelain-enameled cast-iron grates' },
        { item: '10-year warranty on major components' },
      ],
      cons: [
        { item: 'No side burner' },
        { item: 'Basic features at the price point' },
        { item: 'Side tables are small' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Weber Spirit II E-310 is the gas grill I recommend most often. At $649, it offers Weber\'s legendary reliability without premium pricing. The GS4 grilling system ensures consistent ignition and even heat distribution across 529 square inches.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Cooking Performance' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The three stainless steel burners deliver 30,000 BTUs total. Heat distribution is excellent - no significant hot or cold spots. I cooked 12 burgers simultaneously with even results across the grate. The porcelain-enameled Flavorizer bars catch drippings and create smoke for enhanced flavor.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Weber Spirit II E-310 is the best 3-burner gas grill under $700. Reliable ignition, even cooking, and a 10-year warranty make this the safe choice for families. Buy this and grill with confidence for the next decade.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Char-Broil Performance 4-Burner Review: Budget Gas Grill',
    slug: 'char-broil-performance-4burner-review',
    excerpt: 'The Char-Broil Performance 4-Burner delivers solid cooking performance and a side burner for just $399, making it the best budget gas grill option.',
    rating: 4,
    productName: 'Char-Broil Performance 4-Burner',
    productBrand: 'Char-Broil',
    productModel: 'Performance 4-Burner',
    amazonASIN: 'B085QDVLXD',
    productPrice: 399,
    productType: 'gas-grill',
    categoryIndex: 1,
    featured: false,
    estReadingTime: 5,
    prosAndCons: {
      pros: [
        { item: 'Excellent value at $399' },
        { item: '475 sq in primary cooking space plus side burner' },
        { item: 'Four stainless steel burners' },
        { item: 'Easy assembly' },
      ],
      cons: [
        { item: 'Build quality shows cost-cutting' },
        { item: 'Paint finish chips easily' },
        { item: 'No warranty on burners' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'At $399, the Char-Broil Performance 4-Burner offers tremendous value. Four burners plus a side burner provide versatility for family cookouts. The 475 square inches of primary cooking space handles enough food for 6-8 people.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Performance' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The four stainless steel burners heat quickly and distribute heat reasonably well. Some hot spots over the burners, but nothing unexpected at this price. The side burner is genuinely useful for sauces and sides.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Char-Broil Performance 4-Burner is the best gas grill under $400. Accept basic build quality and plan to replace it in 3-5 years, but enjoy great value in the meantime. Perfect for apartment balconies and budget-conscious families.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Masterbuilt Digital Electric Smoker Review: Set-It-Forget-It Smoking',
    slug: 'masterbuilt-digital-electric-smoker-review',
    excerpt: 'The Masterbuilt Digital Electric Smoker makes smoking effortless with digital controls and side chip loading, perfect for beginners at $349.',
    rating: 4,
    productName: 'Masterbuilt Digital Electric Smoker',
    productBrand: 'Masterbuilt',
    productModel: 'MB20071117',
    amazonASIN: 'B074W4B82D',
    productPrice: 349,
    productType: 'electric-smoker',
    categoryIndex: 4,
    featured: false,
    estReadingTime: 6,
    prosAndCons: {
      pros: [
        { item: 'Easy digital temperature control' },
        { item: '710 sq in cooking space' },
        { item: 'Side wood chip loading system' },
        { item: 'No fire management required' },
      ],
      cons: [
        { item: 'Less smoke flavor than charcoal or pellet' },
        { item: 'Build quality is basic' },
        { item: 'Requires electrical outlet' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Masterbuilt Digital Electric Smoker is the easiest path to smoked meats. Set the temperature, add wood chips, and let it work. The 710 square inches across four racks provides ample space for multiple pork shoulders or several racks of ribs.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Ease of Use' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Digital controls make temperature selection simple. The side chip loading system allows adding chips without opening the door and losing heat. Perfect for beginners who want smoking without the fire management learning curve.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Masterbuilt Digital Electric Smoker is the best choice for smoking beginners. Smoke flavor won\'t match charcoal, but convenience and ease of use at $349 make this a smart entry point. Great for apartments with electrical outlets near patios.' }],
          },
        ],
      },
    },
  },
  {
    title: 'Pit Boss PB150PPG Review: Best Portable Pellet Grill',
    slug: 'pit-boss-pb150ppg-review',
    excerpt: 'The Pit Boss PB150PPG delivers genuine pellet grill performance in a portable 43-pound package, perfect for tailgating and camping at $399 CAD.',
    rating: 4,
    productName: 'Pit Boss PB150PPG Portable Tabletop Pellet Grill',
    productBrand: 'Pit Boss',
    productModel: 'PB150PPG',
    amazonASIN: '',
    productPrice: 399,
    productType: 'portable',
    categoryIndex: 5,
    featured: false,
    estReadingTime: 6,
    prosAndCons: {
      pros: [
        { item: '256 sq in cooking space in compact form' },
        { item: 'Digital LED controls' },
        { item: '180-500°F temperature range' },
        { item: 'Lock-tight latches for transport' },
      ],
      cons: [
        { item: 'Small pellet hopper requires frequent refills' },
        { item: 'Temperature swings in windy conditions' },
        { item: 'No WiFi connectivity' },
      ],
    },
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Pit Boss PB150PPG proves portable doesn\'t mean compromised. At 43 pounds with lock-tight latches, this tabletop pellet grill travels easily to tailgates, campsites, and picnics. The 256 square inches accommodates meals for 2-4 people.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Portability & Build' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The convenient handles and latching lid make transport easy. At 43 pounds, one person can load it into a vehicle. Digital LED controls provide the same functionality as full-size Pit Boss grills. The flame broiler lever adds direct grilling capability.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Cooking Performance' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Temperature control is decent for the size. The 180-500°F range handles low-and-slow smoking and high-heat searing. Wind affects temperature stability, so use a windbreak in breezy conditions. The small hopper holds enough pellets for 3-4 hour cooks.' }],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Final Verdict' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'The Pit Boss PB150PPG is the best portable pellet grill available. Real wood-fired flavor in a 43-pound package makes this ideal for RVers, tailgaters, and anyone with limited space. At $399 CAD, it\'s tremendous value for portable pellet grilling.' }],
          },
        ],
      },
    },
  },
]

async function clearAllData(payload: any) {
  console.log('🗑️  Clearing all existing data...')

  // Delete all reviews
  const reviews = await payload.find({ collection: 'reviews', limit: 1000 })
  for (const review of reviews.docs) {
    await payload.delete({ collection: 'reviews', id: review.id })
  }

  // Delete all authors
  const authors = await payload.find({ collection: 'authors', limit: 1000 })
  for (const author of authors.docs) {
    await payload.delete({ collection: 'authors', id: author.id })
  }

  // Delete all categories
  const categories = await payload.find({ collection: 'categories', limit: 1000 })
  for (const category of categories.docs) {
    await payload.delete({ collection: 'categories', id: category.id })
  }

  // Delete all media (removes files from R2)
  const media = await payload.find({ collection: 'media', limit: 1000 })
  for (const mediaItem of media.docs) {
    await payload.delete({ collection: 'media', id: mediaItem.id })
  }

  console.log('✅ All data cleared successfully')
}

async function seed() {
  try {
    console.log('🌱 Starting BBQ Review System seed process...')

    process.env.PAYLOAD_DISABLE_AUTO_PUSH = 'true'

    const payload = await getPayload({ config })

    // Clear all existing data
    await clearAllData(payload)

    // 1. Create Media
    console.log('🖼️  Creating media from Unsplash...')
    const media: any = {
      author: null,
      products: [],
      logo: null,
    }

    // Author image
    console.log(`   ⬇️  Uploading author image to R2...`)
    const authorFile = await downloadImageAsFile(PRODUCT_IMAGES.author, 'jake-thompson.jpg')
    media.author = await payload.create({
      collection: 'media',
      data: { alt: 'Jake Thompson - BBQ Expert' },
      file: authorFile as any,
    })
    console.log(`   ✓ Uploaded author image`)

    // Product images
    for (let i = 0; i < PRODUCT_IMAGES.products.length; i++) {
      console.log(`   ⬇️  Uploading product image ${i + 1} to R2...`)
      const imageFile = await downloadImageAsFile(PRODUCT_IMAGES.products[i], `product-${i + 1}.jpg`)
      const mediaItem = await payload.create({
        collection: 'media',
        data: { alt: `Product ${i + 1} image` },
        file: imageFile as any,
      })
      media.products.push(mediaItem)
      console.log(`   ✓ Uploaded product image ${i + 1}`)
    }

    // Logo
    console.log(`   ⬇️  Uploading logo to R2...`)
    const logoFile = await downloadImageAsFile(PRODUCT_IMAGES.logo, 'logo.jpg')
    media.logo = await payload.create({
      collection: 'media',
      data: { alt: 'Outdoor Grill Center Logo' },
      file: logoFile as any,
    })
    console.log(`   ✓ Uploaded logo`)

    console.log(`✅ Created ${1 + media.products.length + 1} media items`)

    // 2. Create Settings
    console.log('📝 Creating settings...')
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        title: 'Outdoor Grill Center',
        description: 'Expert reviews of outdoor grills, smokers, and BBQ equipment. Find your perfect grill with our in-depth product testing and ratings.',
        url: 'https://outdoorgrillcenter.com',
        copyright: '© 2025 Outdoor Grill Center. All rights reserved.',
        w3ckey: 'placeholder-web3forms-key',
        logo: media.logo.id,
        logoalt: media.logo.id,
      },
    })
    console.log('✅ Settings created')

    // 3. Create Categories
    console.log('📁 Creating categories...')
    const categories = []
    for (const cat of SAMPLE_BBQ_CATEGORIES) {
      const category = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categories.push(category)
      console.log(`   ✓ Created category: ${cat.title}`)
    }
    console.log(`✅ Created ${categories.length} categories`)

    // 4. Create Author
    console.log('👤 Creating author...')
    const author = await payload.create({
      collection: 'authors',
      data: {
        ...SAMPLE_BBQ_AUTHOR,
        image: media.author.id,
      },
    })
    console.log(`   ✓ Created author: ${SAMPLE_BBQ_AUTHOR.name}`)

    // 5. Create Reviews
    console.log('📄 Creating reviews...')
    const reviews = []
    for (let i = 0; i < SAMPLE_PRODUCT_REVIEWS.length; i++) {
      const review = SAMPLE_PRODUCT_REVIEWS[i]
      const reviewData = {
        title: review.title,
        slug: review.slug,
        excerpt: review.excerpt,
        body: review.body,
        rating: review.rating,
        productName: review.productName,
        productBrand: review.productBrand,
        productModel: review.productModel,
        amazonASIN: review.amazonASIN,
        productPrice: review.productPrice,
        productType: review.productType,
        prosAndCons: review.prosAndCons,
        author: author.id,
        categories: [categories[review.categoryIndex].id],
        mainImage: media.products[i].id,
        publishedAt: new Date().toISOString(),
        estReadingTime: review.estReadingTime,
        featured: review.featured,
      }

      const createdReview = await payload.create({
        collection: 'reviews',
        data: reviewData,
      })
      reviews.push(createdReview)
      console.log(`   ✓ Created review: ${review.title}`)
    }
    console.log(`✅ Created ${reviews.length} reviews`)

    // Summary
    console.log('\n🎉 BBQ Review System seed completed successfully!')
    console.log(`
📊 Summary:
   - Media: ${1 + media.products.length + 1} items (uploaded to R2)
   - Settings: Outdoor Grill Center branding
   - Categories: ${categories.length} BBQ categories
   - Authors: 1 BBQ expert (Jake Thompson)
   - Reviews: ${reviews.length} product reviews with ratings

🚀 Next steps:
   1. Start dev server: pnpm dev
   2. Visit /admin to view reviews
   3. Browse the website to see BBQ reviews
    `)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
