const service = require('./services')('booking');

service.User.getUserById(2756).then((user) => {
    console.log(user);

    service.User.getUserById(2756).then((user) => {
        console.log(user);
    });
});

