import faker from 'faker';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  mesorregiao: faker.name.findName(),
  microrregiao: faker.company.companyName(),
  municipio: faker.name.findName(),
  toponimo: faker.name.findName(),
  linguaOrigem: faker.name.findName()
}));

export default users;
