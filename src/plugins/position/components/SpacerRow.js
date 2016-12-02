import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getContext, mapProps, compose, withHandlers } from 'recompose';

const spacerRow = compose(
  getContext({
    selectors: PropTypes.object,
  }),
  connect((state, props) => {
    const { topSpacerSelector, bottomSpacerSelector } = props.selectors;
    const { placement } = props;
    return {
      spacerHeight: placement === 'top' ? topSpacerSelector(state, props) : bottomSpacerSelector(state, props),
    };
  }),
  mapProps(props => ({
    placement: props.placement,
    spacerHeight: props.spacerHeight,
  }))
)(class extends Component {
  static propTypes = {
    placement: PropTypes.string,
    spacerHeight: PropTypes.integer,
  }
  static defaultProps = {
    placement: 'top'
  }

  shouldComponentUpdate(nextProps) {
    const { currentPosition: oldPosition, placement: oldPlacement } = this.props;
    const { currentPosition, placement } = nextProps;

    return oldPosition !== currentPosition || oldPlacement !== placement;
  }

  render() {
    let height = 0, spacerRowStyle = {};
    const { placement, spacerHeight } = this.props;
    const { placement, currentPosition, positionConfig, renderProperties, renderedData } = this.props;

    spacerRowStyle.height = `${spacerHeight}px`;

    return (
      <tr key={placement + '-' + spacerHeight} style={spacerRowStyle}></tr>
    );
  }
});

export default spacerRow;
