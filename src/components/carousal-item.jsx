import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
// import { Video } from 'expo-av'
import { VideoView } from "expo-video";
const { width } = Dimensions.get("window");

const CarousalItem = ({ setActiveIndex, activeIndex, refresh, dash }) => {
  return (
    <>
      {dash?.bannerimages?.length > 0 ? (
        <View style={styles.carouselArea}>
          <Carousel
            width={width - 35}
            height={150}
            style={{ borderRadius: 20 }}
            autoPlayInterval={5000}
            loop
            autoPlay
            data={dash?.bannerimages || []}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => {
              let imgUrl = `${item}?refresh=${refresh}`;
              return (
                <View
                  style={[
                    styles.carousel_slider_style,
                    { position: "relative" },
                  ]}
                >
                  {imgUrl?.includes(".mp4") ? (
                    <VideoView
                      style={styles.videoArea}
                      source={{ uri: imgUrl }}
                      nativeControls={false}
                      resizeMode="cover" 
                      isLooping
                      shouldPlay
                      isMuted
                      onError={(error) => console.error("Video Error:", error)}
                    />
                  ) : (
                    <Image
                      source={{ uri: imgUrl }}
                      style={[styles.img_style, { objectFit: "fill" }]}
                    />
                  )}
                </View>
              );
            }}
          />

          {/* Indicators */}
          {/* <View style={styles.paginationContainer}>
                            {dash?.bannerimages?.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.paginationDot,
                                        activeIndex === i ? styles.activeDot : styles.inactiveDot,
                                        { backgroundColor: activeIndex === i ? '#6D54CF' : '#D9D9D9' }
                                    ]}
                                />
                            ))}
                        </View> */}
        </View>
      ) : null}
    </>
  );
};

export default CarousalItem;

const styles = StyleSheet.create({
  carousel_slider_style: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  videoArea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  paginationDot: {
    width: 9,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 5,
  },

  activeDot: {
    width: 30,
    height: 6,
    backgroundColor: "#6D54CF",
    borderRadius: 4,
  },

  inactiveDot: {
    backgroundColor: "#D9D9D9",
    opacity: 0.5,
  },
  img_style: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  carouselArea: {
    height: "auto",
    overflow: "hidden",
  },
});
