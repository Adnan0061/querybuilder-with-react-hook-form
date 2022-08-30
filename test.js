const { faker } = require('@faker-js/faker');

function randStatus() {
  const fake = Array.from({
    length: faker.datatype.number({ min: 1, max: 3 }),
  }).map(() => faker.datatype.number({ min: 0, max: 2 }));

  return Array.from(new Set(fake));
}
function randMessage() {
  return {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: randStatus(),
    team: faker.commerce.department(),
  };
}

function randMessages(length) {
  return Array.from({ length }).map(randMessage);
}

randMessages(10_000).forEach((msg) => {
  console.log(msg);
  console.log('************************************************--');
});
