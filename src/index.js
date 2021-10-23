const { Elarian } = require('elarian');
require('dotenv').config();

const client = new Elarian({
  apiKey: process.env.ELARIAN_API_KEY,
  orgId: process.env.ELARIAN_ORG_ID,
  appId: process.env.ELARIAN_APP_ID,
});

async function handleUssd(notification, customer, appData, callback) {
  console.log(notification);

  const customerData = customer.getState();
  const customerData2 = customer.getMetadata();
  const input = notification.input.text;

  let { name, choice = 0 } = customerData2;

  const menu = {
    text: '',
    isTerminal: false,
  };

  if (input === '') {
    menu.text = ` Hey there ${name}, welcome`;
    menu.text += 'Hey there  wanna share any feedback?\n';
    menu.text += 'Hey there  and welcome\n';

    callback(menu, appData);
  } else if (parseInt(input) <= 4) {
    menu.text = 'Thank you for your feedback \n';
    menu.isTerminal = true;
  }
}

client
  .on('connected', async () => {
    console.log('App is running!');
    const customer = new client.Customer({
      number: '+254701598106',
      provider: 'cellular',
    });

    const state = await customer.getState();
    console.log(state);

    await customer.updateMetadata({ name: 'Ben', age: 25 });
    const { name } = await customer.getMetadata();

    await customer.sendMessage(
      { number: '12345', channel: 'sms' },
      { body: { text: `Hi ${name}, welcome to crypt watch?` } }
    );
  })
  .on('error', (error) => {
    console.error(error);
  })

  .on('ussdSession', handleUssd)
  .connect();
