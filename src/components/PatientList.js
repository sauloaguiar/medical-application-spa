import React from 'react';
import List, { ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';

class PatientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [
        {
          name: 'Patient #1',
          birthday: '10/10/2010',
          id: 1
        },
        {
          name: 'Patient #2',
          birthday: '10/10/2010',
          id: 2
        }
      ]
    };
  }

  render() {
    const { patients } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Patients</h1>
        <List>
          {patients.map(patient => (
            <ListItem
              key={patient.id}
              primaryText={patient.name}
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

export default PatientList;
