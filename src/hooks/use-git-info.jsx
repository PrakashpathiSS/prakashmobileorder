import { Platform } from "react-native";
import gitinfoAndroid from "../../android/app/git-info.json";
import gitinfoIOS from "../../ios/gitinfo.json";
import Constants from 'expo-constants';
export const gitCommitHashupdate = () => {
    if (Platform.OS == 'android') {
      const buildTimeString = new Date(gitinfoAndroid?.commitTime)?.toLocaleTimeString();
      const buildDateString = new Date(gitinfoAndroid?.commitTime)?.toLocaleDateString('en-US');
      return {
        'Build_Date': buildDateString || '',
        'Build_Time': buildTimeString || '',
        'Build_Version': Constants.expoConfig.version || '',
        'git_Hash': gitinfoAndroid?.commitHash || '',
        'git_Branch': gitinfoAndroid?.branch || '',
      }
    } else if (Platform.OS == 'ios') {
      const buildTimeString = new Date(gitinfoIOS?.BUILD_DATE)?.toLocaleTimeString();
      const buildDateString = new Date(gitinfoIOS?.BUILD_DATE)?.toLocaleDateString('en-US');
      return {
        'Build_Date': buildDateString || '',
        'Build_Time': buildTimeString || '',
        'Build_Version': Constants.expoConfig.version || '',
        'git_Hash': gitinfoIOS?.GIT_COMMIT_HASH || '',
        'git_Branch': gitinfoIOS?.GIT_BRANCH[0] || '',
      }
    }
  }