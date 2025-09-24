import { Text } from '../../ui-kit/text'
import { StyleSheet, View} from 'react-native'
import { color, typography } from '../../theme'
import UseProfile from '../../hooks/use-profile'
import { FlatList } from 'react-native-gesture-handler'
import { baseFont } from '../../theme/font-size'
import { Vertical } from '../../ui-kit/spacer'

const Settings = () => {

  const {
    handleProfileOptions,
    profileOptions,
    dash
  } = UseProfile()

  return (
    <View style={[styles.container,{backgroundColor:dash?.base_themes?.background_color}]}>
      <Text style={[styles.profiletitle, { color:dash?.base_themes?.active_text_color }]}>Settings</Text>
      <Vertical size={24} />
      <View style={[styles.cardContainer,{backgroundColor:dash?.base_themes?.background_color}]}>
        <FlatList
          data={profileOptions}
          renderItem={handleProfileOptions}
          key="!"
          keyExtractor={(item, index) => {
            return '!' + index;
          }}
          contentContainerStyle={styles.contentArea}
        />
      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({

  profile_details_div: {
    alignItems: 'center',
    paddingBottom: 85,
    height: '40%'
  },

  profile_img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    marginTop: 20,
    marginBottom: 18
  },

  profile_picture_div: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 18
  },

  name_style: {
    fontSize: 20,
    fontWeight: '500'
  },

  email_style: {
    fontSize: 16,
    marginBottom: 25
  },

  phn_num_style: {
    fontSize: 16
  },

  img_style: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 40,
  },

  call_icon_div: {
    width: 10,
    height: 15
  },

  phn_num_div: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor:'#FFD4D0',
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderRadius: 30
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF'
  },
  profiletitle: {
    fontSize: baseFont.profile_title,
    fontWeight: '500',
    fontFamily: typography.jakarta_semibold,
    color: '#101010',
    includeFontPadding: false,
    lineHeight: baseFont.profile_title * 1.3,
    paddingVertical: 0
  },
  contentArea: {
    paddingVertical: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
})