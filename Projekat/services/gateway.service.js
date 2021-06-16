"use strict";
const express = require("express");
const bodyParser = require('body-parser');

module.exports = {
    name: "gateway",
    settings: {
        port: process.env.PORT || 3000,
    },
    methods: {
        initRoutes(app) {
            app.get("/beachinfo", this.getData);///za data service
            app.get("/sensorinfo", this.getSensorData);
            app.put("/setsensor", this.putData);
            app.post("/CEP", this.cepService);
        },
        getData(req, res) {
            return Promise.resolve()
                .then(() => {
                    return this.broker.call("data.getData", { "name": req.body.name, "temp": req.body.temp,"time": req.body.time}).then(temps => {
                        res.send(temps);
                    });
                })
                .catch(this.handleErr(res));
        },getSensorData(req,res){
            
            return Promise.resolve()
                .then(() => {
                    return this.broker.call("command.getSensorData", { id: req.body.id }).then(temps => {
                        res.send(temps);
                    });
                })
                .catch(this.handleErr(res));
        },
        putData(req, res) {

            return Promise.resolve()
            .then(() => {
                return this.broker.call("command.setSensorInterval", { id: req.body.id, interval: req.body.interval }).then(temps => {
                    res.send(temps);
                });
            })
            .catch(this.handleErr(res));

        },cepService(req,res){

            return Promise.resolve()
            .then(() => {
                return this.broker.call("analytics.CEPWarning", { message: req.body }).then(temps => {
                    res.send(temps);
                });
            })
            .catch(this.handleErr(res));
            
        },
        handleErr(res) {
            return err => {
                res.status(err.code || 500).send(err.message);
            };
        }
    },
    created() {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.listen(this.settings.port);
        this.initRoutes(app);
        this.app = app;
    }
};