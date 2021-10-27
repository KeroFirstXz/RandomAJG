const { readdirSync, readdir } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = client => {
  readdir("./Bot/Modules/Events/", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const evt = require(`./Events/${file}`);
      let evtName = file.split(".")[0];
      console.log(`[Events Handler] Loaded events ${evtName}.js`);
      client.on(evtName, evt.bind(null, client));
    });
  });
};
