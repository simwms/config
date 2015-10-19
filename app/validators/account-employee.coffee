`import FunctionalValidation from 'ember-functional-validation'`

validateAccountEmployee = FunctionalValidation.create
  employees:
    lessThan: (meta) -> meta.get("servicePlan").then (plan) -> plan.get("employees")

`export default validateAccountEmployee`