var Employees = require("./models/employee");

var express = require("express");
var router = express.Router();

router.get('/employees', function(req, resp) {

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

router.get("/employees/:id", function(req, resp) {

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

router.get("/employees/:id/todo/", function(req, resp) {

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
});

router.get("/employees/:id/todo/:tid", function(req, resp) {

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
});

module.exports = router;