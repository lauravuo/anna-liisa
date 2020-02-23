# [Anna Liisa](https://fi.wikipedia.org/wiki/Anna_Liisa)

![Test](https://github.com/lauravuo/anna-liisa/workflows/Test/badge.svg)

Anna Liisa is a social reading diary for [Helmet reading challenge](<https://www.helmet.fi/fi-FI/Tapahtumat_ja_vinkit/Uutispalat/Helmetlukuhaaste_2020(198681)>)

Readers can form a reader group:

- the first user logs in to to the app and creates a challenge
- when the challenge is created, the first user shares the unique code to other readers
- other readers can then join the group by logging in and entering this unique code

Readers can fill the details of the books they have read to each challenge step. All group users sees also which books other users have added.

Currently app supports authentication via Google.

## Setup

1. Login to Firebase console
   1. Create project
   1. Enable Google authentication
   1. Enable database
1. Copy Firebase project parameters from console and define following environment variables:

   ```
   FB_CONF_API_KEY
   FB_CONF_AUTH_DOMAIN
   FB_CONF_DATABASE_URL
   FB_CONF_PROJECT_ID
   FB_CONF_STORAGE_BUCKET
   FB_CONF_MESSAGING_SENDER_ID
   FB_CONF_APP_ID
   FB_CONF_MEASUREMENT_ID
   ```

1. Launch app locally:
   ```
   nvm use
   npm install
   npm start
   ```
   Open browser at http://localhost:8080
