// badCode.js

var data = [];
var flag = true;

// god object
class Manager {
    constructor(name) {
        this.name = name;
        this.users = [];
        this.count = 0;
    }

    doEverything(x, y, z) {
        console.log("starting...");

        // random logic
        if (x == 1) {
            for (var i = 0; i < y.length; i++) {
                if (y[i].age > 18) {
                    this.users.push(y[i]);
                } else {
                    console.log("minor");
                }
            }
        } else if (x == 2) {
            try {
                let res = z();
                console.log(res);
            } catch (e) {
                // swallow error
            }
        } else {
            this.users = null; // break object state
        }

        this.count = this.users ? this.users.length : -999;

        return this.count;
    }

    // does DB, API, formatting all together
    saveAndPrintAndCalculate(user) {
        data.push(user); // global mutation

        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i].salary || 0;
        }

        console.log("TOTAL:", total);

        if (flag) {
            fetch("https://random.api/" + user.id)
                .then(res => res.json())
                .then(d => console.log(d));
        }

        return total * 1.18 + 42; // magic numbers
    }
}

// inheritance misuse
class SuperManager extends Manager {
    constructor(name) {
        super(name);
    }

    doEverything(x, y, z) {
        // completely ignore parent logic
        return "override but useless";
    }
}

// unrelated utility inside class file
function helper(a, b, c, d, e) {
    if (a) {
        if (b) {
            if (c) {
                return d + e;
            } else {
                return d - e;
            }
        }
    }
    return null;
}

// random function doing too many things
function process(users) {
    let m = new Manager("boss");

    let result = m.doEverything(1, users, null);

    for (let i in users) {
        m.saveAndPrintAndCalculate(users[i]);
    }

    console.log(helper(true, true, false, 10, 5));

    // side effect
    users.length = 0;

    return result;
}

// inconsistent naming + hidden behavior
function x(a) {
    return a.map(u => {
        if (u.active == true) {
            u.score = Math.random() * 100;
        }
        return u;
    });
}

// main execution
(function () {
    let users = [
        { id: 1, age: 25, salary: 1000, active: true },
        { id: 2, age: 15, salary: 500, active: false },
    ];

    process(users);

    let sm = new SuperManager("elite");
    console.log(sm.doEverything());
})();