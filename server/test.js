const accountSid = "AC7f65b4b1ab408a2452c79564d5b45310";
const authToken = "840e7559e2b332a5e07f85dbaac6f2cf";
const client = require("twilio")(accountSid, authToken);
// console.log(client.chat.v2.services);
client.chat.v2
  .services("IS3fdd8d4db9aa465c9db8dfeb6c9029b7")
  .channels("CHc6694133938b4b6d91557722251cfcb6")
  .invites.create({ identity: "identity" })
  .then((invite) => console.log(invite.sid))
  .catch((err) => console.log(err));
