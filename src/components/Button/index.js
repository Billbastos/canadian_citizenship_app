import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from '../Icon';

const Button = ({
  title,
  action,
  variant = 'lg',
  disabled,
  overrides = {},
  icon = { name: null, size: 12, stroke: 2, color: '#fff' },
}) => {
  const btnSize = variant === 'sm' ? 150 : 'auto';
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingVertical: 10,
      alignItems: 'center',
    },
    btnView: {
      backgroundColor: '#006767',
      borderRadius: 12,
      padding: 0,
      margin: overrides.margin || 6,
    },
    btnText: {
      backgroundColor: '#008181',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 12,
    },
    btnViewDisabled: {
      backgroundColor: '#3c106a',
    },
    btnTextDisabled: {
      backgroundColor: '#45127b',
    },
    text: {
      fontSize: overrides.fontSize || 14,
      fontWeight: '500',
      textAlign: 'center',
      paddingRight: icon ? 5 : 0,
    },
  });

  return (
    <TouchableOpacity onPress={action} disabled={disabled}>
      <View
        style={[
          styles.btnView,
          {
            outlineOffset: 3,
            maxWidth: btnSize,
          },
          disabled && styles.btnViewDisabled,
        ]}
      >
        <View
          style={[
            styles.btnText,
            styles.row,
            {
              transform: [{ translateY: -4 }],
              maxWidth: btnSize,
            },
            disabled && styles.btnTextDisabled,
          ]}
        >
          {Boolean(title) && (
            <Text
              style={[styles.text, { color: disabled ? '#6e4597' : '#fff' }]}
            >
              {title}
            </Text>
          )}
          {Boolean(icon.name) && (
            <Icon
              name={icon.name}
              color={icon.color}
              size={icon.size}
              stroke={icon.stroke}
              overrides={{ padding: 0, paddingTop: 2 }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
