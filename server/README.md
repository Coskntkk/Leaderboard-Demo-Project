
![Logo](https://static.wixstatic.com/media/15a9ae_d33b9e18b6b74641bcb5a56ec25d4f2a~mv2.png/v1/fill/w_440,h_440,al_c,q_85,usm_0.66_1.00_0.01/Image-empty-state.webp)


# Leaderboard Server

Server application for Leaderboard Demo Project.

## Features

- RESTful API for players, leaderboard and prize
- Admin panel
- CRUD operations on players and prize for admin



## Demo

[Visit demo]( )


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Mongodb

`MONGODB_URI`

#### Redis

`REDIS_HOST`

`REDIS_PORT`

`REDIS_PASSWORD`

#### Admin Panel
`ADMIN_USERNAME` optional, `admin` by default.

`ADMIN_PASSWORD` optional, `admin` by default.
## Run Locally

Clone project
```
$ git clone https://github.com/Coskntkk/Leaderboard-Demo-Project.git
```

Move to server directory
```
$ cd server
```

Import dependencies
```
$ npm install
```

Start server
```
$ npm Start
```

Visit `localhost:3010`






## API Reference

### Leaderboard

#### Get Leaderboard

```http
  GET /leaderboard/${username}?
```


### Player

#### Get all players

```http
  GET /players
```


#### Create a player

```http
  POST /players
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. Username for player |
| `country` | `string` | **Required**. Country of player |


#### Update a player

```http
  PUT /players/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. Username for player |
| `country` | `string` | **Required**. Country of player |



#### Delete a player

```http
  DELETE /players/${username}
```

### Prize

#### Get prize value

```http
  GET /prize
```


#### Add prize

```http
  POST /prize
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `money` | `string` | **Required**. Value to add |


#### Reset prize value

```http
  POST /prize/reset
```

### Play

```http
  POST /play
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. Username for player |
| `money` | `string` or `Number` | **Required**. Prize to give to player |






