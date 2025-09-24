import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



import { color, typography } from '../theme';
import { formatPhoneNumber } from '../utils/helpers';
import { English } from '../utils/en';
const PickupDetailsComp = ({
    storeData,
}) => {
    return (
        <View>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text
                             allowFontScaling={false}
                                style={{
                                    fontSize: 18,
                                    color: '#000000',
                                    fontFamily: typography.regular,
                                }}
                            >
                                {storeData?.store_name}
                            </Text>
                            <Text
                             allowFontScaling={false}
                                style={{
                                    fontSize: 18,
                                    color: '#000000',
                                    fontFamily: typography.regular,
                                }}
                            >
                                {storeData?.store_street}
                            </Text>
                            <Text
                             allowFontScaling={false}
                                style={{
                                    fontSize: 18,
                                    color: '#000000',
                                    fontFamily: typography.regular,
                                }}
                            >
                                {storeData?.store_city}{" "}
                                {storeData?.store_state}{" "}
                                {storeData?.store_zip_code}
                            </Text>
                            {
                                storeData?.store_phone &&
                                <Text
                                allowFontScaling={false}
                                    style={{
                                        fontSize: 18,
                                        color: '#000000',
                                        fontFamily: typography.regular,
                                    }}
                                >
                                    +1{" "}
                                    {formatPhoneNumber(storeData?.store_phone)}
                                </Text>
                            }

                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text
                 allowFontScaling={false}
                    style={{
                        fontSize: 18,
                        color: '#000000',
                        fontFamily: typography.regular,
                    }}
                >
                    {English.pickuptime_text} (10-15 min)
                </Text>
            </View>

        </View>
    )
}

export default PickupDetailsComp

