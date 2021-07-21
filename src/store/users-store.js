import { writable } from 'svelte/store';

const users = writable([
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "sincere@april.biz",
        "website": "hildegard.org",
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "shanna@melissa.tv",
        "website": "anastasia.net",
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "nathan@yesenia.net",
        "website": "ramiro.info",
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "website": "kale.biz",
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "website": "demarco.info",
    },
    {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info",
        "website": "ola.org",
    },
    {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "website": "elvis.io",
    },
    {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me",
        "website": "jacynthe.com",
    },
    {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io",
        "website": "conrad.com",
    },
    {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "website": "ambrose.net",
    }
]);

const customUsers = {
    subscribe: users.subscribe,
    addUser: (userData) => {
        const newUser = { ...userData };

        users.update((items) => {
            return [ ...items, newUser ];
        });
    },
    updateUser: (id, userData) => {
        users.update((items) => {
            const userIndex = items.findIndex(i => i.id === id);
            const updateUser = { ...items[userIndex], ...userData };
            const updateUsers = [ ...items ];

            updateUsers[userIndex] = updateUser;

            return updateUsers;
        })
    },
    deleteUser: (id) => {
        users.update((items) => {
            return items.filter(i => i.id !== id);
        })
    }
};

export default customUsers;
