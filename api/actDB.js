let db;
let workoutVer;

const request = indexedDB.open('Workout', workoutVer || 1);

request.onupgradeneeded = function (e) {
    console.log('Upgraded needed in IndexedDB');

    const { oldVer } = e;
    const newVer = e.newVer || db.version;

    console.log(`DB updated from version ${oldVer} to ${newVer}`);

    if (db.objectStoresNames.length === 0) {
        db.objectStoresNames('Workout', { autoIncrement: true });
    }
};

request.onerror = function (e) {
    console.log(e.target.result, ' ', e.target.errorCode);
};

function checkDataBase() {
    console.log('Checking db in progress. . .');

    let act = db.transaction(['Workout'], 'readwrite');

    const store = act.objectStore('Workout');

    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/workouts/range', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.length !== 0) {
                        act = db.transaction(['Workout'], 'readwrite');

                        const currentStore = act.objectStore('Workout');

                        currentStore.clear();
                        console.log('Clearing store. . .');
                    }
                });
        }
    };
}

request.onsuccess = function (e) {
    console.log('Request Successful');
    db = e.target.result;

    if (navigator.onLine) {
        console.log('Backend online');
        checkDataBase();
    }
};

const saveRecord = (record) => {
    console.log('Save record called. . .');

    const act = db.transaction(['Workout'], 'readwrite');

    const store = act.objectStore('Workout');

    store.add(record);
};

window.addEventListener('online', checkDataBase);