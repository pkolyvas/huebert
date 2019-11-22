import Hue from "../api/Hue";
import * as Mock from "../__mock__";
import {
  FETCH_LIGHTS,
  SET_ACTIVE_LIGHT
} from "./types";

export const fetchLights = () => async dispatch => {
  const { data } = await Hue.get("/lights");
  const lights = Object.keys(data).map(key => ({ ...data[key], id: key }));

  dispatch({
    type: FETCH_LIGHTS,
    payload: lights
  });
};

export const setLight = light => async dispatch => {
  await Hue.put(`/lights/${light.id}/state`, light.state);
  // If malformed request, return early
  // if(response.data.filter(it => it.error)) {
  //   return;
  // }
  dispatch(fetchLights());
};

export const alertLight = light => async () => {
  await Hue.put(`/lights/${light.id}/state`, { alert: "select" });
  await Hue.put(`/lights/${light.id}/state`, { alert: "none" });
};

export const toggleLight = light => async dispatch => {
  await Hue.put(`/lights/${light.id}/state`, { on: !light.state.on });
  dispatch(fetchLights());
};

export const setActiveLight = light => dispatch => {
  dispatch({
    type: SET_ACTIVE_LIGHT,
    payload: light
  });
};