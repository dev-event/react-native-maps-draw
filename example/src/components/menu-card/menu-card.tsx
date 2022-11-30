import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type TMenuCard = {
  enabled: boolean;
  title: string;
  onTap: () => void;
};
const MenuCard: FC<TMenuCard> = ({ title, onTap, enabled }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onTap}>
      <View
        style={{
          backgroundColor: enabled ? 'green' : 'orange',
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16
        }}
      >
        <Image
          source={require('../../../assets/palette.png')}
          resizeMode={'stretch'}
          style={styles.img}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  title: {
    color: '#241f1f',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    height: 24,
    width: 24,
    tintColor: 'white',
  },
});
