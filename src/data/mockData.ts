import { FlowerSpecimen, Pattern, StitchDictionaryItem, MaterialItem } from '../types';

export const INITIAL_STUDIO_FLOWERS: FlowerSpecimen[] = [
  {
    id: 'bloom-1',
    name: 'Dimensional Ribbon Rose #1',
    category: 'rose',
    type: 'ribbon-rose',
    colorHex: '#C98791',
    colorName: 'Dusty Rose #C98791',
    dmcCode: 'DMC 3803 · 778 · 3012',
    sizeMm: 38,
    layers: 6,
    cx: 190,
    cy: 190,
    description: 'Dimensional folded silk ribbon'
  },
  {
    id: 'bloom-2',
    name: 'Woven Wheel Rose #2',
    category: 'rose',
    type: 'woven-wheel',
    colorHex: '#D6BC91',
    colorName: 'Antique Champagne #D6BC91',
    dmcCode: 'DMC 3820 · 733',
    sizeMm: 30,
    layers: 5,
    cx: 235,
    cy: 145,
    description: 'Circular spoke spiderweb fill'
  },
  {
    id: 'bloom-3',
    name: 'Petite Ribbon Bud #3',
    category: 'rose',
    type: 'ribbon-rose',
    colorHex: '#FFB6C0',
    colorName: 'Vintage Blush #FFB6C0',
    dmcCode: 'DMC 224 · 778',
    sizeMm: 24,
    layers: 4,
    cx: 140,
    cy: 162,
    description: 'Petite folded silk bud'
  },
  {
    id: 'bloom-4',
    name: 'Terracotta Button Rose #4',
    category: 'accent',
    type: 'woven-wheel',
    colorHex: '#B85D43',
    colorName: 'Terracotta Clay #B85D43',
    dmcCode: 'DMC 3772 · 918',
    sizeMm: 28,
    layers: 5,
    cx: 205,
    cy: 232,
    description: 'Padded satin rosette button'
  },
  {
    id: 'bloom-5',
    name: 'English Lavender Spires #5',
    category: 'wildflower',
    type: 'lavender',
    colorHex: '#9B8AA5',
    colorName: 'French Lavender #9B8AA5',
    dmcCode: 'DMC 3836 · 210',
    sizeMm: 22,
    layers: 3,
    cx: 190,
    cy: 95,
    description: 'Bullion knots in soft lilac'
  }
];

export const COLOR_SWATCHES = [
  { name: 'Rose', hex: '#C98791', label: 'Dusty Rose #C98791', dmc: 'DMC 3803' },
  { name: 'Blush', hex: '#F3E4E3', label: 'Vintage Blush #F3E4E3', dmc: 'DMC 778' },
  { name: 'Sage', hex: '#A5B49A', label: 'Sage Sprout #A5B49A', dmc: 'DMC 3012' },
  { name: 'Champagne', hex: '#D6BC91', label: 'Antique Champagne #D6BC91', dmc: 'DMC 3820' },
  { name: 'Forest', hex: '#34483B', label: 'Forest Depths #34483B', dmc: 'DMC 502' },
  { name: 'Clay', hex: '#B85D43', label: 'Terracotta Clay #B85D43', dmc: 'DMC 3772' },
  { name: 'Lavender', hex: '#9B8AA5', label: 'French Lavender #9B8AA5', dmc: 'DMC 3836' },
  { name: 'Bordeaux', hex: '#864E57', label: 'Dried Petal #864E57', dmc: 'DMC 223' },
];

export const PATTERNS_ARCHIVE: Pattern[] = [
  {
    id: 'victorian-rose',
    specimenNumber: '№ 01 · Master Specimen',
    title: 'The Victorian Rose & Ribbon Hoop',
    subtitle: 'Dimensional folded silk rose petals crowned with dense french knot stamens on linen backing.',
    description: 'An archival masterclass pattern recreating 19th-century salon botanical needlework. Layer dimensional folded double-faced silk ribbons over delicate stem-stitched olive vine foundations, finished with clustered textured millet seed French knots.',
    category: ['3d-bouquet', 'roses', 'ribbon'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUc1wiOgvI653-iKG1XWP0Z0ASupcBMAoxPYwKETpNjrLkL--L90hW9HJRIzrjEIPLGKZ_PEj7XiwN_7-zbQ8jpIcLLrmjNojodFrI532BunGfjPoAahVCDaAEh2rACFSqlP7VOOkLYiYX6qMWnhTGBiehMqu_42jZyDvkwokIZ3g9dMbpZ5knCmiu39n4D00OAgBXjTH41D98qw4CR5rsojOgIlSvd9vE2xMjR74bq714QHTrlaGH9w',
    difficulty: 'Intermediate',
    estimatedHours: '5.5 hours',
    hoopSize: '7-inch beech hoop',
    threadsCount: '8 DMC + 3 Ribbon',
    featured: true,
    flossList: [
      { code: 'DMC 223', name: 'Light Dusty Rose', color: '#864e57' },
      { code: 'DMC 3052', name: 'Green Gray Med', color: '#4e6355' },
      { code: 'DMC 3772', name: 'Desert Rose Tan', color: '#360d16' },
      { code: 'Ribbon 7mm', name: 'Muted Peony Silk', color: '#ffd9dd' },
      { code: 'DMC 3803', name: 'Deep Mauve', color: '#6b3740' },
      { code: 'DMC 778', name: 'Blush Mist', color: '#fcb3be' }
    ],
    steps: [
      { title: 'Foundation Vines', description: 'Lay down twin-ply DMC 3052 using Split Stitch and Whipped Stem Stitch to build delicate curved sprigs.' },
      { title: 'Ribbon Petal Assembly', description: 'Thread chenille needle #18 with 7mm silk ribbon; fold accordion rosette layers locking with tension stitches.' },
      { title: 'Dimensional French Knots', description: 'Wrap DMC 3772 two turns tightly around milliner’s needle #3 to punctuate seed pods and central stamens.' }
    ]
  },
  {
    id: 'wild-meadow',
    specimenNumber: '№ 02 · Specimen Archive',
    title: 'Wild Meadow French Knots & Daisies',
    subtitle: 'Delicate spray of pasture daisies and textured heather buds rendered with meditative repetition.',
    description: 'Inspired by tranquil subalpine summer meadows. This blueprint emphasizes the tactile rhythm of the French knot cluster alongside simple Lazy Daisy loops and Back Stitch foliage sprigs on rough oat flax.',
    category: ['wildflowers', 'beginner', '3d-bouquet'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu5njQ-vBD5VThA5RzyiUHhC-zCG1cHoev3H7eF6rZDfm5GnPAidKl6bWouwZzgzN57LC206SpcAlmSiVzXEuuK7uSKEjdlhMMuJ4K2x_0PgAfWpkRSDOJZrWlnsxB2aJhI3N2Z3CJz_jv_5-EZC7N58vh0k7Z-W4ae8CM0SCSCDQgolO2ArLpOTEOKy0elluMR28j2pzOSeD_V5e-LwhnJEJEtf3mWmoTO3l8BRN5zjJilSyk6dtFjA',
    difficulty: 'Beginner Friendly',
    estimatedHours: '2.5 hours',
    hoopSize: '6-inch beech hoop',
    threadsCount: '6 Thread shades',
    featured: true,
    flossList: [
      { code: 'DMC 3836', name: 'Light Grape', color: '#7b444e' },
      { code: 'DMC 744', name: 'Pale Canary', color: '#fcb3be' },
      { code: 'DMC 502', name: 'Blue Green', color: '#34483b' },
      { code: 'DMC Ecru', name: 'Antique Linen', color: '#eee7e3' }
    ],
    steps: [
      { title: 'Wildflower Stems', description: 'Graceful outline stitches contouring around the bouquet.' },
      { title: 'Lazy Daisy Loop Petals', description: 'Individual detached chain stitches forming light petals.' },
      { title: 'Chamomile & Heather Knots', description: 'Granulated French knot clusters creating tactile seed centers.' }
    ]
  },
  {
    id: 'woven-wheel',
    specimenNumber: '№ 03 · Specimen Archive',
    title: 'Woven Wheel Golden Blooms',
    subtitle: 'Elevated dimensional rosewheels spun with spun gold cotton floss and blush accents.',
    description: 'A joyous tactile exercise combining five-spoke spider web rose wheels wrapped in thick 6-strand golden silk threads, ringed by miniature moss stitch knots and delicate pistachio leaf sprigs.',
    category: ['roses', 'beginner', '3d-bouquet'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOZMd9l3Ome7xeVdgX_uYEJ1vMFlPNCnlukD2bDy8gC3O-l66l_rIoBzElM8X37cA2qGK1DgDUSSRGZfvMQnwzWFDxKpBAG8clR1LGFLFVf7Ar_MQjVvNV9UI9JTH5KMG0pno6TZlLOcZSpWRalGsxRlBylrDuC_0u70QhMaYrR7tlkWceYq7ErKQMfRT4_IbaA_bqlabXZ0nwuujzozLyKK-Ihqb1cRKpAMW39vnCxb85-2YdAx2DA',
    difficulty: 'Beginner',
    estimatedHours: '3.0 hours',
    hoopSize: '6-inch hoop',
    threadsCount: '5 Thread colours',
    featured: true,
    flossList: [
      { code: 'DMC 3820', name: 'Straw Gold', color: '#d8e7cb' },
      { code: 'DMC 224', name: 'Dusty Shell', color: '#fcb3be' },
      { code: 'DMC 733', name: 'Olive Brass', color: '#3a4733' },
      { code: 'DMC 3770', name: 'Tawny Cream', color: '#fff8f5' }
    ],
    steps: [
      { title: '5-Spoke Wheel Foundation', description: 'Evenly spaced rays stitched into the linen.' },
      { title: 'Continuous Concentric Weave', description: 'Alternating under-over passes without piercing backing.' },
      { title: 'Foliage Framing', description: 'Padded satin leaves providing contrast.' }
    ]
  },
  {
    id: 'sculptural-rose',
    specimenNumber: '№ 04 · Specimen Archive',
    title: 'Sculptural Dusty Rose Solo Bloom',
    subtitle: 'Monumental solitary English tea rose folded from 7mm double-faced silk satin ribbon.',
    description: 'A gallery-grade showcase piece exploring folded ribbon sculpture. Requires high-tension calico backing and careful heat sealing of pure Japanese Habotai silk ribbons.',
    category: ['ribbon', 'roses'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-HSWevK21vyzBODug1JHsNJnHO-IM91s77biNgjD2fTzGIlL93s_3ZMH46ZZwjJrwvXMfGL6f0RT4dvuO3Hzs3U5qyV0PnKYV8NVnPbZfUF8Tv357tyrMDplNGmk_ETYRGE-ipnC-Px4BlczZzhAN8O6LUjudH5vNxESaFBCa_ngjjcE32HhQ8ZALsVgI-uqVy1ILaepHh1ysWysfVCqvwNRMWZQ5SPc770oXPxFdaP-p2uvC_us-xA',
    difficulty: 'Advanced',
    estimatedHours: '4.0 hours',
    hoopSize: '5-inch hoop',
    threadsCount: 'Pure Silk Ribbon',
    featured: true,
    flossList: [
      { code: 'Silk 13mm', name: 'Dusty Rose Ribbon', color: '#864e57' },
      { code: 'Silk 4mm', name: 'Sage Leaf Ribbon', color: '#4e6355' },
      { code: 'DMC 3721', name: 'Deep Rose Wine', color: '#360d16' },
      { code: 'DMC 422', name: 'Antique Hazel', color: '#dfd9d5' }
    ],
    steps: [
      { title: 'Inner Rose Bud Roll', description: 'Tight central spiral secured with hidden backstitches.' },
      { title: 'Petal Lofts and Turns', description: '90-degree twist per revolution to allow petals to billow.' },
      { title: 'Fishbone Green Sepals', description: 'Lustrous silk threads hugging the base.' }
    ]
  },
  {
    id: 'provencal-herbarium',
    specimenNumber: 'KIT № 104',
    title: 'The Provençal Herbarium',
    subtitle: 'A rich gathering of lavender sprigs, French knot mimosa, and soft satin-stitched olive foliage.',
    description: 'Inspired by the sun-baked hills of southern France, this pattern marries aromatic herbal motifs with high-relief needlework textures.',
    category: ['3d-bouquet', 'wildflowers'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQPcUt9eOOK3NDUPlKO8ot8JT4wzW7LEeiRy1QBuI3JpDipVgK4d36yh97qAf24wY5EBaezqhcW7UqIP6eGz6pRtDPhl-1Gurq3TBCYwEFr4WbWmE-A4rPOvQes33tu6LDFd_6hzwFLjEjkGsgHdmY2GonmCJrhq3V4ocePiSUoQP1upDEv2ukc9jtA4KDx4n558dZYKkUfzkAMyuD2lgss1aFbdeUIa0ZWTX0PnpdBjLIPXbo3m548w',
    difficulty: 'Master Class',
    estimatedHours: '6.5 hours',
    hoopSize: '8" Hoop',
    threadsCount: '14 Silk Floss Skeins',
    flossList: [
      { code: 'DMC 210', name: 'Lavender Mist', color: '#9B8AA5' },
      { code: 'DMC 743', name: 'Mimosa Gold', color: '#caa357' },
      { code: 'DMC 3012', name: 'Olive Leaf', color: '#4e6355' }
    ],
    steps: [
      { title: 'Olive Sprigs', description: 'Dual-tone padded satin foliage.' },
      { title: 'Lavender Bullions', description: 'Elongated needle wraps.' },
      { title: 'Mimosa French Knots', description: 'Dense clusters of golden yellow.' }
    ]
  },
  {
    id: 'david-austin-rose',
    specimenNumber: 'KIT № 108',
    title: 'Heirloom David Austin Rose',
    subtitle: 'Dramatic 3D ribbon work petals combined with tightly bunched French knot centers and tendril vines.',
    description: 'An ode to classic English garden roses with cupped velvety petals that lift right off the Belgian linen canvas.',
    category: ['roses', 'ribbon', '3d-bouquet'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUgZWX6d8eYRXfy4yWXQn9nCKP_8MaPl-k0LrD2kwNMB9-beQmg7z_U_BSIu4bj9PPD41tTiM_TFxNx1FwnR0k7n2_xXhaO6K7Q6hVtiaGedG4DyD5RAqpI2qseclIbTyLg9_Hh7a5SLtNmoeC9Ex9dnlcwy0oaz0H8ufDKW0hkTUCOAT_yYExWiHjT_et6oVL0ogROgpC3LUs3ItA8Ic9_iSeMUqIgTdJHK1oZJwjDVzY15yd0dX5A',
    difficulty: 'Intermediate',
    estimatedHours: '4.5 hours',
    hoopSize: '6" Hoop',
    threadsCount: '8 Ribbons · 4 Floss',
    flossList: [
      { code: 'Ribbon 7mm', name: 'Peach English Rose', color: '#f5ccd5' },
      { code: 'DMC 3802', name: 'Antique Bordeaux', color: '#864E57' },
      { code: 'DMC 3348', name: 'Spring Vine', color: '#a0b6a5' }
    ],
    steps: [
      { title: 'Spoke Skeleton', description: 'Underlay foundation for 3D loft.' },
      { title: 'Silk Ribbon Layering', description: 'Spiral petal volume.' }
    ]
  },
  {
    id: 'midsummer-meadow',
    specimenNumber: 'KIT № 112',
    title: 'Midsummer Meadow Reverie',
    subtitle: 'A serene study in wild chamomile, airy daisies, and feathery grass plumes for mindful stitching sessions.',
    description: 'Mindful needlework for quiet afternoon hours. Minimalist wildflowers bursting with natural charm on unbleached oatmeal linen.',
    category: ['wildflowers', 'minimal', 'beginner'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq4E0wLmRBL6M2UrMHqx9QneI1Fahd-tkHhmKD9sIaoK3C3Lk8uWwEbuMeGlZD1PFToAzf7WKrU-eJrYHdureXaX7g1mprG6wX6d5_qj9Dw-E3fK3CIyKoxdI9cEbMZZhA8Lc4xjZ5CoC8MS3tKpQyDsJIyU3EN7oEgUt_QT-6Zw4Ur1U1-D26GrD9Fzv9FCkWY5Xuo5MC_HjlcM7RkDgmIu2WgRaP3crp-EPjkXG_TZvWq0OynXLEBw',
    difficulty: 'Beginner Friendly',
    estimatedHours: '3.0 hours',
    hoopSize: '7" Hoop',
    threadsCount: '9 Organic Cotton Floss',
    flossList: [
      { code: 'DMC Ecru', name: 'Wild Chamomile', color: '#FAF8F5' },
      { code: 'DMC 3822', name: 'Yarrow Gold', color: '#caa357' },
      { code: 'DMC 524', name: 'Meadow Grass', color: '#737873' }
    ],
    steps: [
      { title: 'Grass Tendrils', description: 'Graceful single-strand stem stitch.' },
      { title: 'Chamomile Petals', description: 'Detached loop daisies.' }
    ]
  }
];

export const STITCH_DICTIONARY: StitchDictionaryItem[] = [
  {
    id: 'woven-wheel-rose',
    name: 'Woven Wheel Rose',
    category: 'Dimensional Rose',
    description: 'Spider web rose base with layered loop relief. Created by anchoring 5 spokes and weaving thread over and under without piercing linen.',
    reliefLevel: 'High 3D',
    needleType: 'Chenille #18',
    difficulty: 'Intermediate',
    timestamp: '06:20',
    tension: '4/5'
  },
  {
    id: 'french-knot-pistil',
    name: 'French Knot Pistil',
    category: 'Texture / Knots',
    description: 'Compact granulated texture used for stamen centers and wildflower fields. 2 wraps around needle with firm downward pull.',
    reliefLevel: 'Low Bead',
    needleType: 'Milliners #7',
    difficulty: 'Beginner',
    timestamp: '03:45',
    tension: '3/5'
  },
  {
    id: 'bullion-knot-rosebud',
    name: 'Bullion Knot Rosebud',
    category: 'Relief Knot',
    description: 'Elongated spiral wraps forming closed flower calyxes, rosebuds, and lavender spires. Requires straight needle with even eye.',
    reliefLevel: 'Medium Ridge',
    needleType: 'Straw #9',
    difficulty: 'Advanced',
    timestamp: '08:15',
    tension: '4/5'
  },
  {
    id: 'fishbone-leaf',
    name: 'Fishbone Leaf',
    category: 'Foliage / Flat',
    description: 'Overlapping diagonal stitches creating a central spine with smooth satin lustre. Ideal for eucalyptus and rose leaves.',
    reliefLevel: 'Flat Satin',
    needleType: 'Embroidery #9',
    difficulty: 'Beginner',
    timestamp: '15:02',
    tension: '3/5'
  },
  {
    id: 'twisted-stem-stitch',
    name: 'Twisted Stem Stitch',
    category: 'Line / Stems',
    description: 'Continuous ropelike line ideal for winding woody stems, tendrils, and floral outlines with seamless curves.',
    reliefLevel: 'Linear Cord',
    needleType: 'Crewel #8',
    difficulty: 'Beginner',
    timestamp: '18:30',
    tension: '3/5'
  },
  {
    id: 'cast-on-petal',
    name: 'Cast-On Free Petal',
    category: 'Detached 3D',
    description: 'Detached dimensional needle-knitted petals that stand completely upright off the fabric surface.',
    reliefLevel: 'Detached 3D',
    needleType: 'Milliners #3',
    difficulty: 'Master',
    timestamp: '24:10',
    tension: '5/5'
  }
];

export const ATELIER_MATERIALS: MaterialItem[] = [
  {
    id: 'beechwood-hoop-20cm',
    name: 'French Polished Beechwood Hoop (20cm / 8")',
    category: 'hoops',
    description: 'Hand-sanded solid European beechwood with knurled solid brass tension screw. Holds linen taut like a drum without bruising fibers.',
    price: 14.50,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg_0kmD7qVyEWveEfKXXgEv6H_looBtn9bAe2pmGByzzCfVB0VNNTVqioCK08j4Z910F-IqH3M2fIQQgkLs9C7uQcU5TK2QSLe4U6sWUNklgI8TAcqVv23vtvqjgJ3wPzrKC--FQt6lSV4xqncZKbj6bBMZSZiDR-X4IKfDf7Ar98CvcpBlY4zvjJ2c8byQuZmwqODVUcnyBt4STlsQvXCWKIinjVlyIkwy0Ugl3SvUJpaJuvDdyPePg',
    details: '20cm diameter · Solid Beechwood · Solid Brass Hardware',
    inStock: true
  },
  {
    id: 'organic-oatmeal-linen',
    name: 'Belgian Organic Raw Flax Linen (45×45cm Cut)',
    category: 'linen',
    description: '32-count unbleached flax ground with natural slub texture. Pre-washed and squared for heirloom longevity.',
    price: 9.80,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPCpmXhfDUN59JwY7bicCQq6Pwq7HZQsw0o8cvgzEk9bdUl-218HNrDnboL8J9iFllg8WINc5llX6mb31_dN9F17biiES0VMb2rIYJOu5V5GtIjxPVvwWDiJsCfKw03GqZUx3epfIvIsrxP9tJsP-2Y5DgYkuo2ScAv5DqpQbD8HZ7j2RL9fBfdxp280g4rlM6wYsQUcJasaGbUCeaKiRgnc1Vna46l0gkUhnKfwV4OLwGz5gXbXStvQ',
    details: '32-Count · 100% Belgian Flax · Natural Oatmeal Hue',
    inStock: true
  },
  {
    id: 'silk-ribbon-sampler-blush',
    name: '100% Spun Mulberry Silk Ribbon (7mm × 5m Spools)',
    category: 'silk-ribbon',
    description: 'Ultra-soft double-faced silk ribbons dyed with botanical extracts. Muted dusty rose, blush peony, and antique champagne.',
    price: 12.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRfRpG0w5VLvgz68JNHxYXToLKMgcq0G2ndXYI-xwiJzMp0372kGfZm64qeFaW0AVujHiodhroYU02tEgBUGbCoQD-_S8a_BoxqZtM7gxHGLMb4K2xPnfP6ZSUKcA2BJyas4_8-M5aY8g52Y3wjfTsfAM1sjHXDBoE753-eCK_lo_LMeg3sr9ycbVBua8hn2LFtf1ZlSsDV-pX1ppNqJpMZWzFPtngKacSwI7bBz5iMZv38jaysaY5rw',
    details: '7mm width · 5 meters per wooden bobbin · Pure Mulberry Silk',
    inStock: true
  },
  {
    id: 'dmc-botanical-palette',
    name: 'DMC Mouliné Floss Skeins (Set of 6 Botanical Shades)',
    category: 'dmc-floss',
    description: 'Six 8-meter skeins of French long-staple cotton floss: DMC 3803, 778, 3012, 502, 3820, and Ecru.',
    price: 8.50,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUgZWX6d8eYRXfy4yWXQn9nCKP_8MaPl-k0LrD2kwNMB9-beQmg7z_U_BSIu4bj9PPD41tTiM_TFxNx1FwnR0k7n2_xXhaO6K7Q6hVtiaGedG4DyD5RAqpI2qseclIbTyLg9_Hh7a5SLtNmoeC9Ex9dnlcwy0oaz0H8ufDKW0hkTUCOAT_yYExWiHjT_et6oVL0ogROgpC3LUs3ItA8Ic9_iSeMUqIgTdJHK1oZJwjDVzY15yd0dX5A',
    details: '6 Skeins × 8m · 100% Double-Mercerized Cotton · France',
    inStock: true
  },
  {
    id: 'needlework-artisan-pack',
    name: 'Needlemaker Specialty Pack (Chenille, Milliners, Straw)',
    category: 'needles',
    description: 'Hand-crafted Japanese carbon steel embroidery needles with gold-plated eyes for effortless ribbon passage.',
    price: 6.20,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSAVhiW_L3uc787TbkNobRMk2m-X4EUU3GdN3DRLnAK7TSDh9XbNJpZAL7YzTMfl4RrzWncBUyeW8PQQbCfhqLUodmygO7GHY-mcnkhoJBgJCoy1J-3Creb6p3cEGkCl71_4AX3J8Sx1DxG1Xw0NUDuPwpuGq5uYmpjult7suAJp0rN0Xrof1-CBj7FZeU4L6bfuchZKwwmsfNIH9rOv0pOP1IUIXJL1iqHjyLoK-BfEBx8Wdp1k50mg',
    details: '6 Pack: 2x Chenille #18, 2x Milliners #7, 2x Crewel #8',
    inStock: true
  }
];
