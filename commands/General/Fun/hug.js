const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text', 'group'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('HUG_DESCRIPTION'),
      usage: '[member:member]',
    });
  }

  async run(msg, [member]) {
    try {
      const author = msg.author.username;
      const user = member ? member.user.username : msg.language.get('THEMSELVES');
      const data = await (await fetch('https://nekos.life/api/v2/img/hug')).json();
      if (!(data || data.url)) return msg.sendError('NO_DATA');
      msg.genEmbed()
          .setEmoteTitle(author, user, 'HUGGING', true)
          
          .setImage(data.url)
          .send();
    } catch (error) {
      console.log(error);
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
