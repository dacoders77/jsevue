/**
 * Used for 422 validation error handle.
 * errors object from vform did not work.
 */

export default
class ValidationErrors {
constructor() {
this.errors = {};
}

get(field) {
if (this.errors[field]) {

return this.errors[field][0];
}
}

record(errors) {
this.errors = errors;
}

clear(field) {
delete this.errors[field];
}

has(field) {
return this.errors.hasOwnProperty(field);
}

any() {
return Object.keys(this.errors).length > 0;
}

}
