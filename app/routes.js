var Schemas = require("./models/schemas");
var mongoose = require("mongoose");

var Employees = mongoose.model("Employee", Schemas.Employee);

var express = require("express");
var router = express.Router();

var validObject = function(o, keyName) {
    var valid = true;
    var keys = Object.keys(o);
    if (keys.length != 1)
        valid = false;
    else if (keys[0] != keyName)
        valid = false;

    return valid;
};

router.route('/employees').get(function(req, resp) {

    Employees.find({}, function(err, data) {
        if (err) {
            console.log('error finding all employees');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    }).select("-_id -books -todo -messages");
});

router.route("/employees/:id").get(function(req, resp) {

    Employees.find({}, function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    }).where("id").equals(Number(req.params.id)).select("-_id -books -todo -messages");
});

router.get("/employees/:id/books/", function(req, resp) {

    Employees.aggregate([{
            $match: {
                id: Number(req.params.id)
            }
        }, {
            $unwind: "$books"
        }, {
            $project: {
                _id: 0,
                id: "$books.id",
                isbn10: "$books.isbn10",
                isbn13: "$books.isbn13",
                title: "$books.title",
                category: "$books.category"
            }
        }

    ], function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });
});

router.get("/employees/:id/books/:bid", function(req, resp) {

    Employees.aggregate([{
                $match: {
                    id: Number(req.params.id)
                }
            }, {
                $unwind: "$books"
            }, {
                $match: {
                    "books.id": Number(req.params.bid)
                }
            }, {
                $project: {
                    _id: 0,
                    id: "$books.id",
                    isbn10: "$books.isbn10",
                    isbn13: "$books.isbn13",
                    title: "$books.title",
                    category: "$books.category"
                }
            }, {
                $limit: 1
            }

        ],
        function(err, data) {
            if (err) {
                console.log('error finding employes');
                resp.json({
                    message: 'Unable to connect to employees'
                });
            }
            else {
                // return found data as json back to request
                resp.json(data);
            }
        });
});

router.route("/employees/:id/todo/").get(function(req, resp) {

    Employees.aggregate([{
            $match: {
                id: Number(req.params.id)
            }
        }, {
            $unwind: "$todo"
        }, {
            $project: {
                _id: 0,
                "id": "$todo.id",
                "status": "$todo.status",
                "priority": "$todo.priority",
                "date": "$todo.date",
                "description": "$todo.description"
            }
        }

    ], function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });
}).post(function(req, res) {

    Employees.find({
        "id": req.params.id
    }, function(err, employee) {
        if (err) {
            console.log(err.message);
        }
        else {
            try {

                var newTodo = JSON.parse(req.body.jsonStr);

                employee[0].todo.push(newTodo);
                employee[0].save(function(err) {
                    if (err) {
                        var msg = "Error saving new todo: " + err.message;
                        console.log(msg);
                        res.json({
                            "success": false,
                            "errorMessage": msg
                        });
                    }
                    else {
                        console.log('Success saving new todo!');
                        res.json({
                            "success": true
                        });
                    }
                });
            }
            catch (e) {
                console.log(e);
                res.json({
                    "success": false,
                    "errorMessage": e.message
                });
            }
        }
    });
});;

router.route("/employees/:id/todo/:tid").get(function(req, resp) {

    Employees.aggregate([{
            $match: {
                id: Number(req.params.id)
            }
        }, {
            $unwind: "$todo"
        }, {
            $match: {
                "todo.id": Number(req.params.tid)
            }
        }, {
            $project: {
                _id: 0,
                "id": "$todo.id",
                "status": "$todo.status",
                "priority": "$todo.priority",
                "date": "$todo.date",
                "description": "$todo.description"
            }
        }, {
            $limit: 1
        }

    ], function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });
}).put(function(req, res) {

    try {

        var newTodo = JSON.parse(req.body.jsonStr);

        var updateObject = {};
        var keys = Object.keys(newTodo);
        var validFields = "id status priority date description".split(' ');
        for (var i = 0; i < keys.length; i++) {
            for (var j = 0; j < validFields.length; j++) {
                if (keys[i] == validFields[j]) {
                    updateObject['todo.$.' + keys[i]] = newTodo[keys[i]];
                    break;
                }
            }
        }

        Employees.update({
            "id": Number(req.params.id),
            "todo.id": Number(req.params.tid)
        }, {
            $set: updateObject
        }, {
            runValidators: true
        }, function(err, emp) {
            if (err) {
                var msg = "Error updating todo: " + err.message;
                console.log(msg);
                res.json({
                    "success": false,
                    "errorMessage": msg
                });
            }
            else {
                res.json({
                    "success": true
                });
            }
        });

        //   Employees.aggregate([{
        //         $match: {
        //             id: Number(req.params.id)
        //         }
        //     }, {
        //         $unwind: "$todo"
        //     }, {
        //         $match: {
        //             "todo.id": Number(req.params.tid)
        //         }
        //     }, {
        //         $project: {
        //             _id: 0,
        //             "id": "$todo.id",
        //             "status": "$todo.status",
        //             "priority": "$todo.priority",
        //             "date": "$todo.date",
        //             "description": "$todo.description"
        //         }
        //     }, {
        //         $limit: 1
        //     }], function(err, emp) {
        //         if (err) {
        //             console.log('error finding todo');
        //             res.json({
        //                 message: 'Unable to connect to employees'
        //             });
        //         }
        //         else {
        //             console.log(emp);
        //             delete newTodo.id;
        //             var keys = Object.keys(newTodo);
        //             var e = emp[0];

        //             for (var i = 0; i < keys.length; i++) {
        //                 if (keys[i] in e)
        //                     e[keys[i]] = newTodo[keys[i]];
        //             }

        //             e.save(function(err) {
        //                 if (err) {
        //                     var msg = "Error updating todo: " + err.message;
        //                     console.log(msg);
        //                     res.json({
        //                         "success": false,
        //                         "errorMessage": msg
        //                     });
        //                 }
        //                 else {
        //                     console.log('Success updating todo!');
        //                     res.json({
        //                         "success": true
        //                     });
        //                 }
        //             });
        //         }
        //     });
    }
    catch (e) {
        console.log(e);
        res.json({
            "success": false,
            "errorMessage": e.message
        });
    }

}).delete(function(req, res) {
    Employees.update({
        id: Number(req.params.id)
    }, {
        $pull: {
            todo: {
                "id": Number(req.params.tid)
            }
        }
    }, function(err, data) {
        if (err) {
            var msg = "Error deleting todo: " + err.message;
            console.log(msg);
            res.json({
                "success": false,
                "errorMessage": msg
            });
        }
        else {
            console.log('Success deleting todo!');
            res.json({
                "success": true
            });
        }
    });
});

router.route("/employees/:id/messages/").get(function(req, resp) {

    Employees.aggregate([{
            $match: {
                id: Number(req.params.id)
            }
        }, {
            $unwind: "$messages"
        }, {
            $project: {
                _id: 0,
                "id": "$messages.id",
                "contact": "$messages.contact",
                "date": "$messages.date",
                "category": "$messages.category",
                "content": "$messages.content"
            }
        }

    ], function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });
});

router.get("/employees/:id/messages/:mid", function(req, resp) {

    Employees.aggregate([{
            $match: {
                id: Number(req.params.id)
            }
        }, {
            $unwind: "$messages"
        }, {
            $match: {
                "messages.id": Number(req.params.mid)
            }
        }, {
            $project: {
                _id: 0,
                "id": "$messages.id",
                "contact": "$messages.contact",
                "date": "$messages.date",
                "category": "$messages.category",
                "content": "$messages.content"
            }
        }, {
            $limit: 1
        }

    ], function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });
});

module.exports = router;