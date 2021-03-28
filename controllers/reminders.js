const Reminders = require('../models/reminders');
const { Op } = require('sequelize');



module.exports = {
    post_api: post_handler,
    get_api: get_handler
}


function post_handler(req, res, next) {
    Reminders.create(req.body)
        .then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reminder."
            });
        });
};

function get_handler(req, res, next) {
    const id = req.params.id;
    if (id) {
        Reminders.findByPk(id)
            .then(data => {
                if (data)
                    res.status(200).send(data);
                else
                    res.status(404).send("ID not found");
            })
            .catch(err => {
                res.status(404).send({
                    message: "ID not found"
                });
            });
    } else {
        const user = req.query.user;
        const after = req.query.after;
        var hasqry = false;
        
        var jsonData = {};
        var whereJson = {};
        
        if (user) {
            jsonData['user'] = user;
            hasqry = true;
        }
        if (after) {
            var dateJson = {};
            dateJson[Op.gte] = parseInt(after);
            jsonData['date'] = dateJson;
            hasqry = true;
        }
        if (hasqry) {
            //qryStr = '{ "where": { ' + qryStr + ' } }';
            whereJson['where'] = jsonData;
        } else {
            qryStr = '{}';
        }
        Reminders.findAll(whereJson)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(404).send({
                    message: "No Records Found"
                });
            });        
    }
};

