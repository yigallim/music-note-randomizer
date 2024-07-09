import { useAppSelector, useAppDispatch } from "../hooks";
import { setSetting, SettingState } from "./slice";

const useSetting = (): [SettingState, (newSetting: SettingState) => void] => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.setting);

  const updateSetting = (newSetting: SettingState) => {
    dispatch(setSetting(newSetting));
  };

  return [settings, updateSetting];
};

export default useSetting;
