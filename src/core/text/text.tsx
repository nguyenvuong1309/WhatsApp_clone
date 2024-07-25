import * as React from 'react';
import {TextProps} from './text.props';
import {Text as ReactNativeText} from 'react-native';

export const Text = (props: TextProps) => {
  const {
    preset = 'default',
    tx,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;
  const content = text;
  const styles = [styleOverride];
  return (
    <ReactNativeText
      {...rest}
      style={styles}
      maxFontSizeMultiplier={0}
      allowFontScaling={false}>
      {content}
    </ReactNativeText>
  );
};
