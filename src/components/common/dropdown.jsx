import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { English } from "../../utils/en";
import { baseFont } from "../../theme/font-size";
import { color, typography } from "../../theme";
import { useState } from "react";

const CustomDropdown = ({
  dropref,
  dash,
  data,
  value,
  dropdownArrow,
  onFocus,
  onBlur,
  disable,
  labelField = "label",
  valueField = "value",
  placeholder = "Select",
  activeColor = dash?.base_themes?.background_color,
  renderItem = null,
  onChange,
  autoScroll = false,
  maxHeight = 220,
  customDropdownStyle = { borderWidth: 0 },
  customPlaceholderStyle = { color: dash?.base_themes?.inactive_text_color },
  customSelectedTextStyle = { color: dash?.base_themes?.inactive_text_color },
  customItemTextStyle = { color: dash?.base_themes?.inactive_text_color },
  customDropdownContainer = {},
  customDropdownItemRow = {
    backgroundColor: dash?.base_themes?.background_color,
  },
  customItemText = { color: dash?.base_themes?.active_text_color },
  customRadioCountainer = { borderColor: dash?.base_themes?.button_color },
  customRadioArea = { backgroundColor: dash?.base_themes?.button_color },
  customSelectRadioborderColor = {
    borderColor: `${dash?.base_themes?.button_color}80`,
  },
  customIconStyle,
  ...rest
}) => {
  const [setArrow, setsetArrow] = useState(false);
  const renderComponent = (item, selected) => {
    return (
      <View style={[styles.dropdownItemRow, customDropdownItemRow]}>
        <Text numberOfLines={1} style={[styles.itemText, customItemText]}>
          {item?.label}
        </Text>
        <View
          style={[
            styles.radioCountainer,
            customRadioCountainer,
            !selected && customSelectRadioborderColor,
          ]}
        >
          {selected && <View style={[styles.radioArea, customRadioArea]} />}
        </View>
      </View>
    );
  };
  return (
    <Dropdown
      ref={dropref}
      style={[styles.dropdown, customDropdownStyle]}
      placeholderStyle={[styles.placeholderStyle, customPlaceholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, customSelectedTextStyle]}
      itemTextStyle={[styles.itemTextStyle, customItemTextStyle]}
      data={data || []}
      iconStyle={[
        dropdownArrow || (setArrow && { transform: [{ rotate: "180deg" }] }),
        {
          tintColor: dash?.base_themes?.active_text_color,
          width: 20,
          height: 20,
        },
        customIconStyle,
      ]}
      activeColor={activeColor}
      onFocus={() => {
        onFocus && onFocus();
        setsetArrow(true);
      }}
      onBlur={() => {
        onBlur && onBlur();
        setsetArrow(false);
      }}
      maxHeight={maxHeight}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoScroll={autoScroll}
      containerStyle={[styles.dropdownContainer, customDropdownContainer]}
      disable={disable}
      renderItem={renderItem ? renderItem : renderComponent}
      {...rest}
    />
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 48,
    width: "60%",
    paddingHorizontal: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: English.rounde_edge.input,
    borderColor: "#D0D5DD",
    padding: 5,
  },
  placeholderStyle: {
    fontSize: baseFont.dropdown_label,
    fontFamily: typography.jakarta_regular,
    color: "#000000",
    textAlign: "right",
    paddingRight: 5,
    includeFontPadding: false,
    lineHeight: baseFont.dropdown_label * 1.3,
    paddingVertical: 0,
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontSize: baseFont.dropdown_label,
    fontFamily: typography.jakarta_regular,
    color: "#000000",
    textAlign: "right",
    paddingRight: 5,
    includeFontPadding: false,
    lineHeight: baseFont.dropdown_label * 1.3,
    paddingVertical: 0,
    fontWeight: "400",
  },
  itemTextStyle: {
    fontSize: baseFont.field_placeholder,
    fontFamily: typography.jakarta_medium,
    color: "#000000",
    includeFontPadding: false,
    lineHeight: baseFont.field_placeholder * 1.3,
    paddingVertical: 0,
  },
  dropdownContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#DBDBD7",
    borderWidth: 1,
    overflow: "hidden",
  },
  dropdownItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: "100%",
  },
  itemText: {
    fontSize: baseFont.dropdown_value,
    color: "#737373",
    fontFamily: typography.jakarta_regular,
    includeFontPadding: false,
    lineHeight: baseFont.dropdown_value * 1.3,
    paddingVertical: 0,
    fontWeight: "400",
    width: "80%",
  },
  radioCountainer: {
    width: 24,
    height: 24,
    borderColor: "#6D54CF",
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  radioArea: {
    width: 10,
    height: 10,
    backgroundColor: "#6D54CF",
    borderRadius: 20,
  },
});
