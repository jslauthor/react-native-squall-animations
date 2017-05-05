/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Slider,
  Image,
  Text,
  View,
  StatusBar
} from 'react-native';

import RNFS from 'react-native-fs';
import Dimensions from 'Dimensions';
import AnimationView from './src/squall/Squall';
import {Blur} from "gl-react-blur";
import CRTEffect from './src/gl/effects/CRTEffect'
import {Surface} from "gl-react-native";
const {height, width} = Dimensions.get('window');

class SquallAnimations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      progress: 0,
      globalTime: 0
    };

    RNFS.readDir(RNFS.MainBundlePath)
      .then((result) => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log(contents);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });

      var fps = 60;
      const draw = (time) => {
          setTimeout(() => {
              requestAnimationFrame(draw);
              this.setState({globalTime:this.state.globalTime + 1});
          }, 1000 / fps);
      }

      draw();
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
  }

  render() {
    const t = this.state.globalTime ? this.state.globalTime : 0;
    return (
      <View style={styles.core}>
        <Surface width={width} height={height} eventsThrough={true} visibleContent={true}>

              <ScrollView style={this.scrollView} width={width} height={height} showsHorizontalScrollIndicator={true}>
                <View width={width} style={styles.container}>
                  <Image source={require('./src/img/test.png')} style={styles.image}>
                    <AnimationView
                      style={styles.animation}
                      play={this.state.isPlaying}
                      progress={this.state.progress}
                      onAnimationUpdate={(e) => console.log(e.nativeEvent)}
                      onAnimationLoaded={(e) => console.log(e.nativeEvent)} />
                  </Image>
                </View>
              </ScrollView>

          </Surface>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  core: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#1c2c3a'
  },
  container: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: '#1c2c3a'
  },
  image: {
    width: 800/2.5,
    height: 4182/2.5,
    top: 0,
    left: 0
  },
  scrollView: {
    flex: 1,
    backfaceVisibility: 'hidden'
  },
  animation: {
    position: 'absolute',
    width: 125,
    height: 125 * 1.5,
    bottom: 135,
    right: 0
  }
});

AppRegistry.registerComponent('SquallAnimations', () => SquallAnimations);
