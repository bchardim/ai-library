import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBug,
  faChartLine,
  faCircle,
  faDice,
  faExclamationCircle,
  faExclamationTriangle,
  faLaptopCode,
  faQuestion,
  faRobot,
  faSitemap,
  faShareAlt,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons'

const configureFontLibrary = () => {
  library.add(
    faBug,
    faChartLine,
    faCircle,
    faDice,
    faExclamationCircle,
    faExclamationTriangle,
    faLaptopCode,
    faQuestion,
    faRobot,
    faSitemap,
    faShareAlt,
    faSnowflake,
  );
  return library;
};

export default configureFontLibrary;
