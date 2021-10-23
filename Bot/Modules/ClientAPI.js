const Discord = require('discord.js')
const { Client } = Discord;
const { Player } = require('discord-player');
const fs = require('fs')

class ClientAPI extends Client {
  constructor(options) {
    super(options);
    this.config = require('../Data/Config.js')
    this.aliases = new Discord.Collection()
    this.commands = new Discord.Collection()
    this.category = fs.readdirSync('./Bot/Commands/')
    this.player = new Player(this, this.config.opt.discordPlayer);
  }

  parseNumber(string) {
    const isNumber = string => isFinite(string) && +string === string;
    const isString = string => typeof string === "string";
    function parseNumberFromString(str) {
      const matches = str
      .replace(/,/g, "")
      .match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
      return matches && matches[0] ? Number(matches[0]) : null;
    }
    if (isNumber(string)) {
      return Number(string);
    }
    if (isString(string)) {
      return parseNumberFromString(string);
    }
    return NaN;
  }
}

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

module.exports = ClientAPI;