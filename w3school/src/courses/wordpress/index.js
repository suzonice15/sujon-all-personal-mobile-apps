// WordPress course. From setup to custom themes, plugins and WooCommerce.
//
// PHP samples use lang: 'php'; commands use lang: 'bash'; structure uses 'text'.

import gettingStarted from './getting-started';
import contentMedia from './content-media';
import themesCustomizer from './themes-customizer';
import plugins from './plugins';
import themeDevelopment from './theme-development';
import pluginDevelopment from './plugin-development';
import woocommerce from './woocommerce';
import performanceSecurity from './performance-security';
import hostingMaintenance from './hosting-maintenance';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  contentMedia,
  themesCustomizer,
  plugins,
  themeDevelopment,
  pluginDevelopment,
  woocommerce,
  performanceSecurity,
  hostingMaintenance,
  projectsInterview,
];

export default {
  id: 'wordpress',
  title: 'WordPress',
  short: 'WordPress',
  tagline: 'Build, customise and ship WordPress sites',
  color: '#21759B',
  icon: 'web',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
