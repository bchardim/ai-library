import React from "react";
import { Icon, Grid } from "patternfly-react";
import { CatalogTileView } from "patternfly-react-extensions";

import ServiceTile from "../../ServiceTile";
import RegressionCard from "../../Regression";
import FlakeCard from "../../Flake";
import MOCK_SERVICES from "./mockServices";

import "./Home.scss";

function Home() {
  const registerClick = (e, s) => {
    console.log(`${s.title} clicked`);
  };

  let mockCards = MOCK_SERVICES.map((s, index) => {
      let iconClass = s.icon.type === "pficon" ? `${s.icon.type} ${s.icon.type}-${s.icon.name}` : null;
      let faIcon = s.icon.type === "fa" ?  s.icon.name : null;

      return (
        <ServiceTile
          key={`tile-${index}`}
          title={s.title}
          featured={false}
          comingSoon={true}
          iconClass={iconClass}
          faIcon={faIcon}
          description={s.description}
          onClick={e => registerClick(e, s)}
        />
      );
    }
  );

  return (
    <div className="home">
      <div className="ai-library-desc-panel">
        <Grid>
          <Grid.Row>
            <Grid.Col xs={12}>
              <h1>AI Library</h1>
              <p>
                The AI Library provides machine learning as a service. The development of these services is a
                community driven open source project to make AI more accessible. You can try out some of those
                services here.
              </p>
              <p>
                Learn more about the AI Library at the
                <a target="_blank" rel="noopener noreferrer" href="https://gitlab.com/opendatahub/ai-library"> project
                  page <Icon type="fa" name="external-link-alt"/></a>.
              </p>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </div>
      <Grid>
        <Grid.Row>
          <Grid.Col xs={12}>
            <CatalogTileView>
              <CatalogTileView.Category
                title=""
                totalItems={MOCK_SERVICES.length}
                viewAll={true}
                onViewAll={() => console.log("View All")}
              >
                <RegressionCard/>
                <FlakeCard/>
                {mockCards}
              </CatalogTileView.Category>
            </CatalogTileView>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>
  );
}


export default Home;
