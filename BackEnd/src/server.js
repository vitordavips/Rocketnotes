require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");

const uploadConfig = require("./configs/upload");

const AppError = require("./utils/AppErro");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/file", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

//Esse app.use vai capturar os error.
app.use((error, req, res, next) => {
    //Esse if vai capturar o erro do cliente.
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message 
        });
    }

    console.log(error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server iniciou na PORT ${PORT}`));