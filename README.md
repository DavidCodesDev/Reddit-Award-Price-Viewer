# Reddit-Award-Price-Viewer
A chrome extension that shows the total price of the awards on a reddit post

You can either install this chrome extension via this link : https://chrome.google.com/webstore/detail/reddit-award-price-viewer/hfmbnmndfhcniigklamalgjffddndfcc
Or download this repo and install it manually via this method https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612

This extension edits your DOM view of (almost) any reddit webpage you visit, this plugin converts the awards of a reddit post into the actual USD$ value. Assuming 1 coin equals 0.4 cents.


I got this idea by looking at Steemit, a social website like Reddit where users get awarded with money for quality posts, I thought of reddit having something of monetary value and instantly thought of translating reddit gold into its actual value.
NOTE: So far, this plugin only works with old.reddit.com, there's a handy chrome extension that automatically redirects your browser's reddit page to its old.reddit equivalent: https://chrome.google.com/webstore/detail/old-reddit-redirect/dneaehbmnbhcippjikoajpoabadpodje

Example:
![](https://lh3.googleusercontent.com/4ku79S4Xu76X_Qc2K2rXG2Zp_bVokW_mr9ltbLi28AES3-9_ast6usks_WiIRqqvO0EXvpL2=w640-h400-e365-rj-sc0x00ffffff)


IMPORTANT: 

- This doesn't work with new.reddit.com yet, only with old.reddit, because new.reddit's classes are randomly generated with each visit I will have to find another way to insert the dollar values (I simply haven't spent time on that yet, prioritized old.reddit for now)
- This doesn't work on 2nd, 3rd, 4th etc pages. Because the way this code works is it needs to fetch the url/.json of any reddit link, additional pages of a subreddit do not have this .json (as far as i know)(so this only works on frontpages)
- Sadly this doesn't work YET with nested replies, I later realized I will have to rewrite my code into a recursion to support all replies, more explanation below:

So the way this code works is it fetches your current reddit website's JSON mini API (try it out yourself, go to old.reddit.com/.json and see what happens). This gives me information about
all the awards a post has received. I had to differentiate between a front page and an individual post with comments. I first started out coding the front page portion so the core code was already set, while coding the individual post portion I realized I actually should've coded
a recursion method so I can traverse replies within replies within replies within replies etc. This is why currently only top comments are calculated, and not their replies.
A simple map/reduce combination gathers all the awards with their respective comment/post, I noticed that the ''name:'' of a post (json data) is its id with a prefix of ''thing_''. < This is the case with old.reddit, new.reddit is tricky because of random generated classnames.
With that I know each post's/comment's value and I insert these USD values into their respective posts.

TODO:

- Rewrite code into a recursion to cover replies within replies within replies etc.
- Support new.reddit too.
- Change the USD$ from a paragraph to a nicer tag (CSS)
- Make an input in the popup so the user can assign its own $ value for 1 coin, currently the program assumes (200cents/500coins) = 0.4 cents for each coin

This plugin really puts in perspective how much reddit earns through their awarding system

