
![Logo](https://static.wixstatic.com/media/15a9ae_d33b9e18b6b74641bcb5a56ec25d4f2a~mv2.png/v1/fill/w_440,h_440,al_c,q_85,usm_0.66_1.00_0.01/Image-empty-state.webp)

# Leaderboard Demo Project

Leaderboard is a FullStack Demo Project for Leaderboard system of a hypothetical game.
The leaderboard is sorted a according to the money each player has
earned since the start of the week and the leaderboard will reset each week. Once the
leaderboard resets, the top 100 players will be rewarded with in-game money according
to their rankings and everything will start over.
 
Read [API Guide]( https://github.com/Coskntkk/Leaderboard-Demo-Project/blob/main/server/README.md ) for more information of server-side.


## Tech Stack

**Client:** React, Bootstrap

**Server:** Node, Express, Mongoose, Redis


## Required Features

- Leaderboard for first 100 players, the player, 3 players above and 2 players below the player.
    - For example if your player’s rank is 136 you should return first 100 players and 133.,134.,135.,136.,137.,138. players.
    - 2% of the money earned by all players during that week must be collected in the prize pool.
- At the end of the week, the collected money will be distributed among users according to their ranks.
- The data should contain playerId, money, name and country of players.
- The leaderboard screen should contain a table with 5 columns. These columns will show top ranking data of players. These columns will show `Country`, `Username`, `Rank`, `Money`, `Daily Diff` 
    - The Daily Diff column displays the ranking change made today `colored`.


## Extra Features

- Prize panel and countdown for remaining time until the end of the week.

![Prize Panel](https://i.imgur.com/FVXFxYW.png)

- Searching player by username.

![Prize Panel](https://i.imgur.com/tabVa1U.png)

- Admin panel for CRUD operations on players and prize.

![Prize Panel](https://i.imgur.com/0ZpDsie.png)

- RESTful API fror players, prize and leaderboard. See [API Guide]( https://github.com/Coskntkk/Leaderboard-Demo-Project/blob/main/server/README.md )

- Tiny flags for countries of players.

![Prize Panel](https://i.imgur.com/ooSfe3E.png)


## Run Locally

Clone the project

```bash
$  git clone https://github.com/Coskntkk/Leaderboard-Demo-Project
```

Go to the client directory and install dependencies

```bash
$  cd client
$  npm install
```

Start the server

```bash
$  npm start
```

Go to the server directory and install dependencies

```bash
$  cd ..
$  cd server
$  npm install
```

Start the server

```bash
$  npm start
```


## Author

[@Coskntkk](https://github.com/Coskntkk)

