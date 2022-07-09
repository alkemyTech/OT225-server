const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const membersRouter = require("./routes/members");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const config = require("./config/config");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories.js");
const newsRouter = require("./routes/news");
const organizationsRouter = require("./routes/organization");
const activitiesRouter = require("./routes/activities");
const testimonyRouter = require("./routes/testimony");
const contactsRouter = require("./routes/contacts.js");
const commentRouter = require('./routes/comments.js');

const app = express();
app.use(cors());



// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/news", newsRouter);
app.use("/organization", organizationsRouter);
app.use("/activities", activitiesRouter);
app.use("/categories", categoriesRouter);
app.use("/news", newsRouter);
app.use("/organization", organizationsRouter);
app.use("/members", membersRouter);
app.use("/slides", require("./routes/slides"));
app.use("/testimonies", testimonyRouter);
app.use("/contacts", contactsRouter);
app.use('/comments', commentRouter);
app.use('/auth', require('./routes/auth'));


/* swagger */
const swagger = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "NodeJs ONG-API",
      description: "This is an API of the Alkemy's 225 group",
      version: "0.0.1",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Develop",
      }
    ],
    
  },
  
  apis: ["./routes/*.js"],
};

app.use(
  config.swagger.path,
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swagger))
);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
