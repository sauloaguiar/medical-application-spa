import React from 'react';
import List, { ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { loadUserById } from '../actions/patients';

class PatientList extends React.Component {
  componentWillMount() {
    const { loadUserById } = this.props;
    loadUserById(1);
  }

  render() {
    const { patients } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Patients</h1>
        <List>
          {patients.map(patient => (
            <ListItem
              key={patient.id}
              primaryText={`${patient.firstName} ${patient.lastName}`}
              secondaryText={patient.birthday}
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIcon={<ActionInfo />}
            />
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    patients: state.patients.patients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserById: id => dispatch(loadUserById(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
