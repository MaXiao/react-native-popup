/** @format */

import React from 'react';
import {usePopup} from '../context';
import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from '../Colors';

const ModalView = ({customView, showDismiss = true}) => {
  const {hidePopup} = usePopup();
  return (
    <View style={styles.shadow}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          {customView}
          {showDismiss && (
            <Pressable
              hitslop={10}
              style={({pressed}) => [
                {
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
              onPress={() => hidePopup()}>
              <Image
                style={styles.icon}
                source={require('../resource/x-symbol.png')}
              />
            </Pressable>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', borderRadius: 4, overflow: 'hidden'},
  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
    elevation: 4,
  },
  icon: {width: 20, height: 20},
});

export default ModalView;
