<div align="center">
<h1> Discord_Bot_Typescript_Template </h1>
<strong><i> NPX TEMPLATE FOR DISCORD V14 IN TYPESCRIPT</i></strong>
</div>

## Installation

npx:

```sh
# Creates a folder inside the route
npx create_discord_bot_typescript folder_name
# Clone in the actual route without creating a new folder
npx create_discord_bot_typescript .
```

## Execution

```js
// FOR PRODUCTION
npm start 		//run builded javascript bot
// FOR PRODUCTION
npm run tsc  		//compile typescript to javascript
// FOR DEVELOPMENT
npm run dev  		// run project transpiled to javascript
```

## Usage

.env:

```sh
# COMPLETE FIELDS
BOT_TOKEN= 				# NECESSARY
BOT_ID=					# NECESSARY
MONGODB_URI=				# OPTIONAL
USER_DB=				# OPTIONAL
HOST_DB=				# OPTIONAL
NAME_DB=				# OPTIONAL
PASSWORD_DB=				# OPTIONAL
PORT_DB=				# OPTIONAL
```

src/config/config.ts:

```ts
// Modify this parameter as you want
export default {
	devs: ["403917639673577482"],   // DEVELOPERS ID
	prefix: "$",  			// MAIN PREFIX
	colors: {
		main: "#e3d041", 	// MAIN COLOR
	},
};
```
