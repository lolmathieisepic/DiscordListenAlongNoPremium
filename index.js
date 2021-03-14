const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule } = require('powercord/webpack');
const isPremium = getModule(['isSpotifyPremium'], false);
const Profile = getModule(['getProfile'], false);
const Dispatcher = getModule(['dispatch'], false);

module.exports = class extends Plugin {
   startPlugin() {
      inject('spotifylistenalong', Profile, 'getProfile', async function (args) {
         inject('spotifylistenalong1', isPremium, 'isSpotifyPremium', async function (_) {
            return true;
         });
         Dispatcher.dispatch({ type: 'SPOTIFY_PROFILE_UPDATE', accountId: args[0], isPremium: true });
         uninject('spotifylistenalong1');
         return;
      });
   }

   pluginWillUnload() {
      uninject('spotifylistenalong');
      uninject('spotifylistenalong1');
   }
};
