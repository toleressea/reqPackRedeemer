# reqPackRedeemer

**tl;dr** Chrome extension that automatically gets REQ Pack codes out of Twitch chat during competitive Halo tournaments and redeems them at Halo.gg.

### How do I use it?

1. Install the extension:
   1. Clone the repository
   2. Go to `chrome://extensions/` and load the repository folder as an "unpacked extension"
2. Now installed and reloaded, open two new tabs:
   * `https://www.twitch.tv/halo`
   * `https://www.halowaypoint.com/`
3. Click the extension icon and check the `Enabled` checkbox

### What criteria do you use to select codes to be redeemed?

* Only look at twitch messages containing the string "code", case insensitive
* Alphanumeric, uppercase, no special characters
* Length of the potential code must be >= 8 and <= 12

### Is this illegal in some way?

I really hope not. I have reviewed all the "Terms of Use" and "Terms of Service" I can find in connection with the Halo tournaments and the Halo website, and can't find anything that suggests this would get you in trouble. That said, use at your own risk. This is a side project created for fun for personal use only.
