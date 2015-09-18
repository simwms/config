`import FunctionalValidation from 'ember-functional-validation'`

validateEmployee = FunctionalValidation.create
  email: 
    presence: true
  fullName:
    presence: true

`export default validateEmployee`