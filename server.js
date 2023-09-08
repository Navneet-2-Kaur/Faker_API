const express = require("express");
const app = express();
const { faker } = require(`@faker-js/faker`); // got from faker-js/faker docs
const port = 8000;

//middleware
  // make sure these lines are above any app.get or app.post code blocks
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User object
const createUser = () => {
  const newFakeUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber:faker.phone.imei(),
    lastName:faker.person.lastName(),
    firstName:faker.person.firstName(),
    _id: faker.string.uuid()
  };
  return newFakeUser;
};

// Company object
const createCompany = () =>{
  const newFakeCompany = {
    _id: faker.string.uuid(),
    name: faker.company.name(),
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipcode: faker.location.zipCode(),
      country: faker.location.country()
    }
  };
  return newFakeCompany 
};

// Get request 

app.get("/api/users/new", (req, res)=> {
  const user = createUser()
  res.json( user );
});

app.get("/api/companies/new", (req, res)=> {
  const company = createCompany()
  res.json( company );
});

app.get("/api/user/company", (req, res)=> {
  const user = createUser()
  const company = createCompany()
  res.json( { user: user, company: company } ); // or just user, company because auto assign
});


// this needs to be below the other code blocks
app.listen(port, () => console.log(`Listening on port: ${port}`));
