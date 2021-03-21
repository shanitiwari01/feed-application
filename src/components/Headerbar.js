import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { View } from 'react-native';
import { base_url } from '../core/constant';

/**
 * 
 * Managing header bar functionality 
 * 
 * @returns Headerbar
 */
const Headerbar = (props) => {
  const _goBack = () => props.navigation.goBack();

  return (
    <View>
      <Appbar.Header>
        {
          props.back ? (
            <Appbar.BackAction onPress={_goBack} />

          ) : (
            <Avatar.Image size={35} source={{ uri: base_url + userDetails.image }} />

          )
        }
        <Appbar.Content title={props.title} />
        {
          props.plus && <Appbar.Action icon="plus" onPress={() => props.navigation.navigate('NewFeed')} />
        }
        
      </Appbar.Header>
    </View>
  );
};

export default Headerbar;