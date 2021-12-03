//====================================================================//

let requestBody = null;
let queryParameters = null;
let databaseQuery = null;
let databaseResponseBody = null;
let responseBody = null;
let appLibFunctions = null;

//====================================================================//

const { server, getConnection } = require("./server.js");

//=========================SERVER FUNCTION============================//

const filterQuery = async (request, response, next) => {
  queryParameters = request.query;
  const { status, priority, category, dueDate } = queryParameters;
  const statusList = ["TO DO", "IN PROGRESS", "DONE"];
  const priorityList = ["HIGH", "MEDIUM", "LOW"];
  const categoryList = ["WORK", "HOME", "LEARNING"];
  if ("status" in queryParameters && !statusList.includes(status)) {
    response.status(400);
    response.send("Invalid Status");
  } else if ("priority" in queryParameters && !priorityList.includes(priority)) {
    response.status(400);
    response.send("Invalid Priority");
  } else if ("category" in queryParameters && !categoryList.includes(category)) {
    response.status(400);
    response.send("Invalid Category");
  } else {
    next();
  }
};

//=========================SERVER FUNCTION============================//

const getTodos = async (request, response, next) => {
  queryParameters = request.query;
  const { status, priority, category, dueDate } = queryParameters;
  if (status !== undefined && priority !== undefined) {
    databaseQuery = `SELECT * FROM todo WHERE status = '${status}' AND priority = '${priority}'`;
    databaseResponseBody = await databaseConnection.all(databaseQuery);
    response.send(databaseResponseBody.map((a) => todo(a)));
  } else if (status !== undefined && priority === undefined) {
    databaseQuery = `SELECT * FROM todo WHERE status = '${status}'`;
    databaseResponseBody = await databaseConnection.all(databaseQuery);
    response.send(databaseResponseBody.map((a) => todo(a)));
  }
};

//=========================SERVER FUNCTION============================//

const getTodo = async (request, response, next) => {
  const { todoId } = request.params;
  databaseQuery = `SELECT * FROM todo WHERE id = ${todoId}`;
  databaseResponseBody = await databaseConnection.get(databaseQuery);
  response.send(todo(databaseResponseBody));
};

//=========================SERVER FUNCTION============================//

const todo = (todoObj) => {
  return {
    id: todoObj.id,
    todo: todoObj.priority,
    priority: todoObj.priority,
    status: todoObj.status,
    category: todoObj.category,
    dueDate: todoObj.due_date,
  };
};

//=========================SERVER FUNCTION============================//

appLib = {
  filterQuery: filterQuery,
  getTodos: getTodos,
  getTodo: getTodo,
};

//====================================================================//

getConnection("todoApplication.db").then((connection) => {
  databaseConnection = connection;
});

//====================================================================//

exports.server = server;
exports.appLib = appLib;

//====================================================================//
