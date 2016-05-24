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
  Text,
  View
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
              this.setState({globalTime:time});
          }, 1000 / fps);
      }

      draw();
  }

  render() {
    const t = this.state.globalTime ? this.state.globalTime : 0;
    console.log(t)
    return (
      <View style={styles.core}>

          <View style={styles.container}>
            <Text onPress={() => { this.setState({isPlaying: true}); }}>Play Me</Text>
            <ScrollView style={this.scrollView}>
              <Surface width={300} height={400}>
                <CRTEffect time={t}>
                  <View width={300} height={400}>
                    <AnimationView
                      style={styles.animation}
                      play={this.state.isPlaying}
                      progress={this.state.progress}
                      onAnimationUpdate={(e) => console.log(e.nativeEvent)}
                      onAnimationLoaded={(e) => console.log(e.nativeEvent)} />
                  </View>
                </CRTEffect>
              </Surface>
            </ScrollView>
            <Slider style={styles.slider}
              onValueChange={(e) => { this.setState({progress:e}); console.log(e)}}
              maximumValue={1} minimumValue={0} step={.001} />
          </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  core: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  scrollView: {
    flex: 1
  },
  animation: {
    width: 300,
    height: 400
  },
  slider: {
    width: 200,
    height: 10
  }
});

AppRegistry.registerComponent('SquallAnimations', () => SquallAnimations);
