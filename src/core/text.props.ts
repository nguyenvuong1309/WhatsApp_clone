import {StyleProp, TextProps as TextProperties, TextStyle} from 'react-native';

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   */
  tx?: any; //TxKeyPath

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: any; //TextPresets

  /**
   * type of font
   */
  // type?: keyof typeof typography;
}
