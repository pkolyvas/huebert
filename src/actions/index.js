import Hue from "../api/Hue";
import { FETCH_ROOMS, FETCH_LIGHTS } from "./types";

export const fetchRooms = () => async dispatch => {
  const response = await Hue.get("/groups");
  dispatch({
    type: FETCH_ROOMS,
    payload: response.data
  });
};

export const fetchLights = () => async dispatch => {
  const response = await Hue.get("/lights");
  dispatch({
    type: FETCH_LIGHTS,
    payload: response.data
  });
};