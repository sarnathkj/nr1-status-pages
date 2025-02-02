import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import IndIncident from './ind-incident';

export default class IncidentTimeline extends React.Component {
  static propTypes = {
    version: PropTypes.number,
  };

  static defaultProps = {
    version: 1,
  };

  backgroundColors = {
    none: '#10a600',
    minor: '#ffda00',
    major: '#ea7c00',
    critical: '#bd071f',
  };

  getTimeLineItems() {
    return this.props.incidents.map((incident, index) => {
      const date = new Date(incident.created_at);
      return (
        <TimelineItem
          className={`incident-impact-${incident.impact}`}
          dateInnerStyle={{
            background: this.backgroundColors[incident.impact],
          }}
          key={`${index}`}
          dateText={`${date.toDateString()}`}
        >
          <IndIncident incident={incident} />
        </TimelineItem>
      );
    });
  }

  getTimeLine() {
    if (this.props.incidents.length === 0) {
      return <div> No reported outages </div>;
    }
    return <Timeline lineColor={'black'}>{this.getTimeLineItems()}</Timeline>;
  }

  render() {
    return (
      <div className="timelineContainer">
        <div className="header">
          <div className="dot-header">
            <div className="dot-container">
              {' '}
              <div className="dot none"></div>
              <div className="dot-name">No Impact</div>
            </div>
            <div className="dot-container">
              {' '}
              <div className="dot minor"></div>
              <div className="dot-name">Minor Impact</div>
            </div>
            <div className="dot-container">
              {' '}
              <div className="dot major"></div>
              <div className="dot-name">Major Impact</div>
            </div>
            <div className="dot-container">
              {' '}
              <div className="dot critical"></div>
              <div className="dot-name">Critical Impact</div>
            </div>
          </div>
        </div>
        {this.getTimeLine()}
      </div>
    );
  }
}
