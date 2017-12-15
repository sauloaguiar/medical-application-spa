store: {
  user: // logged user data 
  patients // list/map of logged user's patients
  adminstrations // list/map of patients' medications/timesheets

}


json-generator.com's file

[
  {
      'repeat(5, 10)': 
    {
      id: '{{index()}}',
      firstName: '{{firstName()}}',
      lastName: '{{surname()}}',
      birthday: '{{moment(this.date(new Date(1990, 10, 1), new Date(2005, 10, 2))).format("x") }}',
      prescriptions: [{
        'repeat(1, 3)':
        {
          id: '{{index()}}',
          assignedAt: '{{moment(this.date(new Date(2016, 10, 1), new Date(2016, 10, 1))).format("x") }}',
          frequencyId: '{{index()}}',
          startDate: '{{moment(this.date(new Date(2016, 10, 1), new Date())).format("x") }}',
          endDate: '{{moment(this.date(new Date(2018, 10, 1), new Date(2020, 10, 2))).format("x") }}',
          patiendId: '{{index()}}',
          name: '{{random("Acetaminophen", "Hizentra", "Hydrocodone", "Premarin", "Protonix", "Warfarin", "Yervoy")}}',
          dose: '{{ integer(1, 20) }}',
          unit: '{{random("mg", "caps", "tbsp")}}'

        }
      }]
    }
  }
]