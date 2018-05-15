import React from 'react';
import { connect } from 'react-redux';
import { loadPatientsByCaregiverId } from '../actions/patients';

class Schedule extends React.Component {
  componentDidMount() {
    const { loaded, loadPatientScheduleAction } = this.props;
    const { id } = this.props.match.params;
    if (!loaded) {
      loadPatientScheduleAction(id);
    }
  }
  render() {
    const { id } = this.props.match.params;
    const { schedule, loaded } = this.props;
    console.log(schedule);
    if (!loaded) {
      return <div>Loading...</div>;
    } else {
      if (schedule.length === 0) {
        return <div>{`No prescriptions for patient #${id}`}</div>;
      } else {
        return <div>Render prescriptions list here</div>;
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const schedule = state.patients.patients.loaded
    ? state.patients.patients.filter(
        patient => patient.id === ownProps.match.params.id
      )[0].prescriptions
    : [];
  return {
    schedule
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPatientScheduleAction: id => dispatch(loadPatientsByCaregiverId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
