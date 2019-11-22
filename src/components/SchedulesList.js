import React from "react";
import { connect } from "react-redux";
import { fetchSchedules } from "../actions";

const SchedulesList = ({ schedules }) => {
  return <div>SchedulesList</div>;
};

const mapStateToProps = state => {
  return { rules: state.schedules };
};

export default connect(mapStateToProps, { fetchSchedules })(SchedulesList);
