import React from 'react';
import { requireNativeComponent, UIManager } from 'react-native';
const RNSLAnimation = requireNativeComponent('RNSLAnimation', AnimationView);

const {
  SLSizingAspectFit,
  SLSizingAspectFill,
  SLSizingOriginal,
  SLPlaybackTypeOnce,
  SLPlaybackTypeLoop,
  SLPlaybackTypePingPong
} = UIManager.RNSLAnimation.Constants;

export const ASPECT_MODES = {
  FIT: SLSizingAspectFit,
  FILL: SLSizingAspectFill,
  ORIGINAL: SLSizingOriginal
}

export const PLAYBACK_TYPES = {
  ONCE: SLPlaybackTypeOnce,
  LOOP: SLPlaybackTypeLoop,
  PING_PONG: SLPlaybackTypePingPong
}

class AnimationView extends React.Component {

  static propTypes = {
    playbackType: React.PropTypes.number,
    aspectMode: React.PropTypes.number,
    play: React.PropTypes.bool
  };

  static defaultProps = {
    playbackType: PLAYBACK_TYPES.LOOP,
    aspectMode: ASPECT_MODES.FIT,
    play: false
  };

  render() {
    return <RNSLAnimation
              {...this.props}
              playbackType={this.props.playbackType} />;
  }
}

module.exports = AnimationView;
