import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// import { English } from '../../../utils/en';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

const MapComponent = ({
    mapRef,
    handleMapReady,
    storeData,
    style
}) => {
    const latitude = Number(storeData?.location?.latitude) || 37.78825;
    const longitude = Number(storeData?.location?.longitude) || -122.4324;
    
    return (
        <View
            style={[styles.countainer, style && style]}
        >
            <View
                style={styles.subCountainer}
            >
                {
                    <MapView
                        ref={mapRef}
                        mapType={'satellite'}
                        zoomTapEnabled={true} 
                        zoomEnabled={true}  // Enable pinch-to-zoom
                        scrollEnabled={true} // Enable dragging
                        pitchEnabled={true}  // Enable tilting gestures
                        style={{ flex: 1 }}
                        provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                        onMapReady={handleMapReady}
                        initialRegion={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.0006,
                            longitudeDelta:0.0006,
                        }}
                        loadingFallback={
                            <View>
                                <Text>Loading...</Text>
                            </View>
                        }
                    >
                        {storeData?.location?.latitude &&
                            storeData?.location?.longitude && (
                                <Marker
                                    draggable
                                    coordinate={{ latitude, longitude, }}
                                    title="Selected Location"
                                    description={`Lat: ${storeData?.location?.latitude}, Long: ${storeData?.location?.longitude}`}
                                />
                            )}
                    </MapView>
                }
            </View>
        </View>
    )
}

export default MapComponent

const styles = StyleSheet.create({
    countainer: {
        flexDirection: "row",
        height: "30%",
        width: '100%',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
     
    },
    subCountainer: {
        width: "100%",
        height: "100%",
       
    }
})

