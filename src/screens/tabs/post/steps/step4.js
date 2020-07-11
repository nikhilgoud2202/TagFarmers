import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import { Dialog, Portal, List, Button, Appbar } from 'react-native-paper';
import { postStep1ValidationSchema } from '../../../../utils/validations';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Header from '../../../../components/common/Header';
import { Header } from 'react-native-elements';

const Step1 = props => {
  return (
    <View>
      <Appbar.Header theme={DarkTheme}>
        <Appbar.BackAction onPress={props.back} />
        <Appbar.Content title="Platform to Interact" />
      </Appbar.Header>
      <View style={styles.container}>
        <Formik
          initialValues={{
            platform: '',
            tags: [],
            experience: '',
            linkedInProfile: '',
          }}
          //  validationSchema={postStep1ValidationSchema}
          onSubmit={values => {
            props.next();
            props.saveState(values);
          }}>
          {formProps => (
            <View style={styles.container}>
              <Text style={styles.label}>Platform*</Text>
              <TextInput
                placeholder="Platform. ex: Skype, Teams, etc."
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={formProps.handleChange('platform')}
                onBlur={formProps.handleBlur('platform')}
                value={formProps.values.platform}
              />
              <Text style={styles.errorText}>
                {formProps.touched.platform && formProps.errors.platform}
              </Text>
              <Text style={styles.label}>Tags</Text>
              <TextInput
                placeholder="Add some tags. ex: angular, react, etc"
                placeholderTextColor={'#7777'}
                style={styles.input}
                onBlur={formProps.handleBlur('tags')}
                value={formProps.values.tags}
              />
              <Text style={styles.tags}>
                {formProps.touched.tags && formProps.errors.tags}
              </Text>
              <Text style={styles.label}>Experience</Text>
              <TextInput
                placeholder="Expirience in years ex: 2, 2.5 etc"
                placeholderTextColor={'#7777'}
                style={styles.input}
                keyboardType={'numeric'}
                onChangeText={formProps.handleChange('experience')}
                onBlur={formProps.handleBlur('experience')}
                value={formProps.values.experience}
              />
              <Text style={styles.errorText}>
                {formProps.touched.totalHours && formProps.errors.experience}
              </Text>
              <Text style={styles.label}>Profile Summary</Text>
              <TextInput
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={formProps.handleChange('profileSummary')}
                value={formProps.values.profileSummary}
                multiline={true}
                numberOfLines={5}
                scrollEnabled={true}
                placeholder={'Describe your experience. '}
              />
              <Text style={styles.profileSummary}>
                {formProps.touched.totalHours &&
                  formProps.errors.profileSummary}
              </Text>
              <Text style={styles.label}>linkedIn Profile</Text>
              <TextInput
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={formProps.handleChange('linkedInProfile')}
                value={formProps.values.linkedInProfile}
                scrollEnabled={true}
                keyboardType={'url'}
                placeholder={'linked in profile URL '}
              />
              <Text style={styles.linkedInProfile}>
                {formProps.touched.totalHours &&
                  formProps.errors.linkedInProfile}
              </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={{ width: '100%' }}>
                  <Button
                    mode="contained"
                    color={'black'}
                    onPress={formProps.handleSubmit}>
                    Post My Skill
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default withTheme(Step1);