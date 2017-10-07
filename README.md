## Care Management Application

[![CircleCI](https://circleci.com/gh/sauloaguiar/medical-application-spa.svg?style=svg)](https://circleci.com/gh/sauloaguiar/medical-application-spa)

This project hosts the front end for [Medical Application](https://github.com/sauloaguiar/medical-application).

### Motivation

This is a learning project that involves front end development using a SPA that will consume a REST API.

### Application Context

The overall idea is to create a system that allows users to manage med administration for a third person.
Initially, the system should support three user roles - admin, caregiver and patients. Admins are special types of caregiver - they can manage the meds to be administered - add/remove them or change the time that they should be given to a patient.
A caregiver will be notified whenever a med should be administered and will certify that it was taken.
Every med should be associated with a patient.
A caretaker can provide services for more than one patient.

### Technology Stack

* [React](https://facebook.github.io/react/)
* [React-Redux](https://github.com/reactjs/react-redux)
* [Redux-Router](https://github.com/ReactTraining/react-router)
* [Redux-thunk](https://github.com/gaearon/redux-thunk)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).