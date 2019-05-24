const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall"
];

//predefined route to traverse the nodes in the map
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House",
    "Bob's House", "Town Hall", "Daria's House",
    "Ernie's House", "Grete's House", "Shop",
    "Grete's House", "Farm", "Marketplace", "Post Office"
];

//this function will create a map object given an array of roads
//for each node stored, it will store an array of connected nodes
function BuildGraph(edges) {
    let graph = Object.create(null);
    //This will add a new edge to the graph
    function AddEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        }
        else {
            graph[from].push(to);
        }
    }
    /*
        for every element in edges, make the from and to location by splitting the strings by the - character
        then add those edges to the graph so it connects the two points
    */
    for (let [from, to] of edges.map(r => r.split("-"))) {
        AddEdge(from, to);
        AddEdge(to, from);
    }
    return graph;
}

class PGroup{
    constructor(members){
        this.members = members;
    }

    add(value){
        if(this.has(value)) return this;
        return new PGroup(this.members.concat([value]));
    }

    delete(value){
        if(!this.has(value)) return this;
        return new PGroup(this.members.filter(v => v !== value));
    }

    has(value){
        return this.members.includes(value);
    }
}

//Class will keep track of the current state of the village at anyone time.
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        //return the current state of the village if the desired destination is not reachable via the robot's current position
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }
        else {
            /*
                create a map array of the parcels that are being moved to the next location.If the parcel's location is the same as the robots location, then the robot collects it and moves it.
                filter will remove any parcels if the parcels location is the same as the address on the parcel
            */
            let parcels = this.parcels.map(
                p => {
                    if (p.place != this.place) return p;
                    return { place: destination, address: p.address };
                }).filter(p => p.place != p.address);

            return new VillageState(destination, parcels);
        }
    }
}

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = pickRandom(Object.keys(roadGraph));
        let place;
        do {
            place = pickRandom(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({ place, address });
    }
    return new VillageState("Post Office", parcels);
}

//function to pick a random element from an array
function pickRandom(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

//function that determines the fastest route through the map
function findRoute(graph, from, to) {
    //creates a work list for routes that should be explored next
    let work = [{
        at: from,
        route: []
    }];
    //go through the work array
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) })
            }
        }
    }
}

//robot that visits all the points randomly until all the packages are delivered
function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        //console.log(state);
        console.log(`Moved to ${action.direction}`);
        //if(turn > 20) break;
    }
}

//function to pick a random direction for the robot to move in
function randomRobot(state) {
    return { direction: pickRandom(roadGraph[state.place]) };
}

//robot that traverses the map with a predefined route
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {
        direction: memory[0],
        memory: memory.slice(1)
    };
}

//robot that searches for the fastest route through the map
function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        }
        else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

function lazyRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return { route: findRoute(roadGraph, place, parcel.place), pickUp: true };
            }
            else {
                return { route: findRoute(roadGraph, place, parcel.address), pickUp: false };
            }
        });

        function score({ route, pickUp }) {
            return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }
    return { direction: route[0], memory: route.slice(1) };
}

//variation of runRobot but returns the number of turns it took to reach the end.
function testRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

//compared robots to each other to measure efficiency
function compareRobots(robot1, memory1, robot2, memory2) {

    let robot1TurnsAvg = 0;
    let robot2TurnsAvg = 0;

    for (let tasks = 0; tasks < 100; tasks++) {
        robot1TurnsAvg += testRobot(VillageState.random(), robot1, memory1);
        robot2TurnsAvg += testRobot(VillageState.random(), robot2, memory2);
    }
    //console.log(`Average move for robot 1: ${robot1TurnsAvg / 100}`);
    //console.log(`Average move for robot 2: ${robot2TurnsAvg / 100}`);

    return robot1TurnsAvg < robot2TurnsAvg ? "R1" : "R2";
}

//Create the actual roadGraph object using the array of destinations
const roadGraph = BuildGraph(roads);

//runRobot(villageState, randomRobot);
//runRobot(villageState, routeRobot, []);
//runRobot(villageState, goalOrientedRobot, []);
//console.log(compareRobots(goalOrientedRobot, [], lazyRobot, []));

PGroup.empty = new PGroup([]);
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));