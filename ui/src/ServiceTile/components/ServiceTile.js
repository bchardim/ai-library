import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./ServiceTile.scss"

const defaultMaxDescriptionLength = 112;

const ServiceTile = ({
  id,
  className,
  featured,
  iconImg,
  iconClass,
  faIcon,
  badges,
  title,
  vendor,
  description,
  comingSoon,
  maxDescriptionLength,
  truncateDescriptionFn,
  ...props
}) => {
  const classes = classNames("service-tile catalog-tile-pf", { featured }, { "coming-soon": comingSoon }, className);

  const defaultTruncateDescription = (text, max = defaultMaxDescriptionLength) => {
    if (typeof text !== "string" || text.length <= max) {
      return text;
    }

    return (
      <React.Fragment>
        {text.substring(0, max - 3)}
        &hellip;
      </React.Fragment>
    );
  };

  const renderBadges = () => {
    if (!badges || !badges.length) {
      return null;
    }

    return (
      <div className="catalog-tile-pf-badge-container">
        {badges.map((badge, index) => (
          <span key={`badge-${index}`}>{badge}</span>
        ))}
      </div>
    );
  };

  const renderIcon = ({iconImg, iconClass, faIcon}) => {
    if (iconImg) {
      return <img className="catalog-tile-pf-icon" src={iconImg} alt="" />;
    }

    if (iconClass) {
      return <div className="service-tile-pf-icon-container"><span className={`service-tile-pf-icon ${iconClass}`} /></div>;
    }

    if (faIcon) {
      return <div className="service-tile-pf-icon-container"><FontAwesomeIcon icon={faIcon} /></div>;
    }
  };

  const truncateDescription = truncateDescriptionFn || defaultTruncateDescription;

  return (
    <div id={id} className={classes} {...props}>
      <div className="catalog-tile-pf-contents">
        <div className="catalog-tile-pf-header">
          {renderIcon({iconImg, iconClass, faIcon})}
          {renderBadges()}
        </div>
        <div className="catalog-tile-pf-body">
          <div className="catalog-tile-pf-title">{title}</div>
          <div className="catalog-tile-pf-subtitle">{vendor}</div>
          <div className="catalog-tile-pf-description">{truncateDescription(description, maxDescriptionLength, id)}</div>
        </div>
      </div>
      {comingSoon && <div className="catalog-tile-pf-banner">Feature Coming Soon!</div>}
    </div>
  );
};

export default ServiceTile;
