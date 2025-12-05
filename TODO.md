## TODOS

### 1. Validate URL

- [ ] Update CLI application so that it only accepts valid URL.
- [ ] Use a regular expression to check that the URL contains a valid format.
- [ ] If the input is invalid, show an error message and prompt the user to enter the value again.
- [ ] Run the app and enter incorrect data to make sure it correctly asks again.

### 2. Include a timestamp

- [ ] Include a `createdAt` field to each entry.
- [ ] When the user submits a contact, automatically add the current date and time in ISO format using `new Date().toISOString()`.
- [ ] Run the app, enter a few entries, and confirm that each row now includes the timestamp in the final column.
