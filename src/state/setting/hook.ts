import { useAppSelector, useAppDispatch } from "../hooks";
import { setSetting, SettingState } from "./slice";

const useSetting = (): [SettingState, (newSetting: SettingState) => void] => {
  const dispatch = useAppDispatch();
  const setting = useAppSelector((state) => state.setting);

  const updateSetting = (newSetting: SettingState) => {
    dispatch(setSetting(newSetting));
  };

  return [setting, updateSetting];
};

export default useSetting;
