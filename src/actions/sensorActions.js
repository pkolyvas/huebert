import Hue from "../api/Hue";
import { FETCH_SENSORS } from "./types";

export const fetchSensors = () => async dispatch => {
  const { data } = await Hue.get("/sensors");
  const sensors = Object.keys(data).map(key => ({ ...data[key], id: key }));

  dispatch({
    type: FETCH_SENSORS,
    payload: sensors
  });
};
