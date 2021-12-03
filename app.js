//====================================================================//

const { server, appLib } = require("./appLib.js");

const { filterQuery, getTodo, getTodos } = appLib;

//==========================SERVER CODE===============================//

server.get("/todos/", filterQuery, getTodos, async (request, response) => {});
server.get("/todos/:todoId/", getTodo, async (request, response) => {});

//==========================SERVER CODE===============================//

module.exports = server;

//====================================================================//
