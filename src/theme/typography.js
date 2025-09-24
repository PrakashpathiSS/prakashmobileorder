/**
 * The various styles of fonts are defined in the <Text /> component.
 *
 * How to add font
 * Run the command: npx react-native link
 *
 * This will add the fonts in this directory to the native iOS and Android projects.
 *  Ensure the path to this directory at react-native.config.js is correct.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  regular: 'poppins_regular',
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  medium: 'poppins_medium',
  /**
   * For TextField validation error
   */
  semibold: 'poppins_semibold',

  bold: 'poppins_bold',

  anonyms_regular: 'RobotoMono-Regular',
  
  anonyms_bold: 'RobotoMono-Bold',
   //jakarta
  jakarta_regular: 'PlusJakartaSans-Regular',

  jakarta_medium: 'PlusJakartaSans-Medium',

  jakarta_semibold: 'PlusJakartaSans-SemiBold',

  jakarta_extrabold: 'PlusJakartaSans-ExtraBold',

  jakarta_bold: 'PlusJakartaSans-Bold',

  //droid
  droid_regular: 'DroidSans',

  droid_bold: 'DroidSans-Bold',
};
