const PROJECT_SCREENSHOTS: Record<string, string> = {
  'agentie-hostess': '/work/projects/agentie-hostess.jpg',
  'artcharm-md': '/work/projects/artcharm-md.jpg',
  astronic: '/work/projects/astronic.jpg',
  axean: '/work/projects/axean.jpg',
  balcon: '/work/projects/balcon.jpg',
  bestfit: '/work/projects/bestfit.jpg',
  climatperfect: '/work/projects/climatperfect.jpg',
  collanteca: '/work/projects/collanteca.jpg',
  'concept-personnalise': '/work/projects/concept-personnalise.jpg',
  dynutrition: '/work/projects/dynutrition.jpg',
  'gear-systems': '/work/projects/gear-systems.jpg',
  'gur-gury': '/work/projects/gur-gury.jpg',
  'hostess-chisinau': '/work/projects/hostess-chisinau.jpg',
  'hostess-training': '/work/projects/hostess-training.jpg',
  'ic-cardiologie': '/work/projects/ic-cardiologie.jpg',
  'jta-logistics': '/work/projects/jta-logistics.jpg',
  'peisagist-360': '/work/projects/peisagist-360.jpg',
  'plan-de-afaceri': '/work/projects/plan-de-afaceri.jpg',
  prunovicgor: '/work/projects/prunovicgor.jpg',
  'reusable-bottle': '/work/projects/reusable-bottle.jpg',
  riguti: '/work/projects/riguti.jpg',
  'rns-auto': '/work/projects/rns-auto.jpg',
  servisan: '/work/projects/servisan.jpg',
  solumshop: '/work/projects/solumshop.jpg',
  'spa-hostess': '/work/projects/spa-hostess.jpg',
  superdent: '/work/projects/superdent.jpg',
  vendmax: '/work/projects/vendmax.jpg',
}

// Exemples vérifiables déjà reliés au bon type de travail dans le CMS.
export const HOME_SERVICE_EXAMPLES: Record<string, string> = {
  'creare-site-uri': 'agentie-hostess',
  'magazine-online': 'vendmax',
  'site-uri-corporative': 'superdent',
  'landing-page-uri': 'plan-de-afaceri',
  'integrari-plati-online': 'artcharm-md', // MAIB + MIA confirmate în CMS
}

export function getProjectScreenshot(slug: string | null | undefined): string {
  return slug ? PROJECT_SCREENSHOTS[slug] ?? '' : ''
}
