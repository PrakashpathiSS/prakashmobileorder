import { flatten, mergeAll } from 'ramda';
import * as React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import { color, spacing, typography } from '../../theme';
import { Text } from '../text';
import { useSelector } from 'react-redux';

const BASE_VIEW = {
  paddingHorizontal: spacing[2],
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT = {
  fontSize: 20,
  paddingHorizontal: spacing[3],
  fontFamily: typography.secondary,
};

const viewVariants = {
  solid: { ...BASE_VIEW, backgroundColor: '#E76F51' },
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  },
  outline: {
    ...BASE_VIEW,
    borderWidth: 2,
    borderColor: '#E76F51',
    backgroundColor: 'white',
  },
};

const textVariants = {
  solid: {
    ...BASE_TEXT,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0,

  },
  bold: {
    ...BASE_TEXT,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0,
    fontFamily: typography.medium,
  },
  outline: {
    ...BASE_TEXT,
    color: '#E76F51',
    fontFamily: typography.medium,
    textAlign: 'center',
    top: 2,
  },
};

const imageStyles = {
  height: 20,
  width: 20,
  resizeMode: 'contain'
}

const logocountainer = { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
export function Button(props) {
  const {
    variant = 'solid',
    title,
    style: styleOverride,
    textStyle: textStyleOverride,
    image = "",
    textCountainerStyle,
    imagestyle,
    children,
    disabled,
    opacity = true,
    loading,
    loaderColor ="",
    Color,
    numberOfLines,
    opacityColor = false,
    ripple = true,
    isRadioImage = '',
    isRadioTextstyle={
      color:'#000'
    },
    isRadio = false,
    isRadiovalue = "",
    isRadioType = 'text',
    isRadioCustomCountainer = {},
    isRadioCustomCheckArea = {},
    isRadioSelectedCustomCheckArea = {},
    isRadioCustomImagearea = {},
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewVariants[variant] || viewVariants.solid, styleOverride]),
  );

  const textStyle = mergeAll(
    flatten([textVariants[variant] || textVariants.solid, textStyleOverride]),
  );

  const imageArea = mergeAll(
    flatten([imageStyles, imagestyle]),
  );

  const countainer = mergeAll(
    flatten([logocountainer, textCountainerStyle]),
  );


  const renderContent = () => {
    if (children) {
      return children
    }
    else if (image !== "") {
      return (
        <View style={countainer}>
          <Image source={image} style={imageArea} />
          <Text numberOfLines={numberOfLines} text={title} style={[textStyle, Color && { color: Color }]} />
        </View>
      )
    }
    else if (isRadio) {
      return (
        <View style={[styles.custombuttonArea, isRadioCustomCountainer]}>
          <Text numberOfLines={numberOfLines} text={title} style={[textStyle, Color && { color: Color }]} />
          <View style={[styles.checkarea,
            isRadioCustomCheckArea,
          isRadiovalue ? [{
            borderWidth: 0,
            borderColor: '#000000',
            backgroundColor: '#86E69B',
          }, isRadioSelectedCustomCheckArea] : null
          ]}>
            {
              isRadiovalue ?
                <>
                  {
                    isRadioType == 'image' ?
                      <Image source={isRadioImage}
                        style={[styles.checkimagearea, isRadioCustomImagearea]} />
                      : <Text style={[styles.notext, isRadioTextstyle]}>{`${isRadiovalue}`}</Text>
                  }
                </> : null
            }
          </View>
        </View>
      )
    }
    else {
      return (
        <Text numberOfLines={numberOfLines} text={title} style={[textStyle, Color && { color: Color }]} />
      )
    }
  }

  const disableStyle =
    variant === 'link'
      ? { backgroundColor: '#FFFFFF' }
      : { backgroundColor: opacityColor ? opacityColor : "#000", opacity: 0.5 };

  return (
    <Pressable
      style={[viewStyle, disabled && opacity ? disableStyle : null]}
      {...{ disabled }}
      {...rest}
      android_ripple={ripple ? { color: '#FFFFFF' } : undefined}>
      {loading ? (
        <ActivityIndicator
          color={loaderColor !== "" ? loaderColor : variant === 'link' || variant === 'outline' ? color.primary : '#FFFFFF'}
        />
      ) : (
        renderContent()
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  custombuttonArea: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  checkarea: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  checkimagearea: {
    height: 12,
    width: 12,
    resizeMode: 'contain'
  },
  notext: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: typography.droid_regular,
  },
})

