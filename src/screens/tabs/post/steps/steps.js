import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedMultistep from '../lib';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import { ScrollView } from 'react-native-gesture-handler';

const allSteps = [
  { name: 'step 1', component: Step1 },
  { name: 'step 2', component: Step2 },
  { name: 'step 3', component: Step3 },
];

export default class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onNext = () => {
    console.log('Next');
  };
  onBack = () => {
    console.log('Back');
  };

  finish = state => {
    console.log('TCL: App -> state', state);
  };

  render() {
    return (
      <View style={{ flex:30 }}>
        <ScrollView>
          <AnimatedMultistep
            steps={allSteps}
            onFinish={this.finish}
            animate={true}
            onBack={this.onBack}
            onNext={this.onNext}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 32,
    color: '#444',
  },
  lowerContainer: {
    flex: 2,
  },
});
