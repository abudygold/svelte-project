import { ae as writable } from './client.58e46997.js';

function exclude(obj, keys) {
  let names = Object.getOwnPropertyNames(obj);
  const newObj = {};

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const cashIndex = name.indexOf('$');
    if (
      cashIndex !== -1 &&
      keys.indexOf(name.substring(0, cashIndex + 1)) !== -1
    ) {
      continue;
    }
    if (keys.indexOf(name) !== -1) {
      continue;
    }
    newObj[name] = obj[name];
  }

  return newObj;
}

function prefixFilter(obj, prefix) {
  let names = Object.getOwnPropertyNames(obj);
  const newObj = {};

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (name.substring(0, prefix.length) === prefix) {
      newObj[name.substring(prefix.length)] = obj[name];
    }
  }

  return newObj;
}

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
    /* {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "address": {
            "street": "Hoeger Mall",
            "suite": "Apt. 692",
            "city": "South Elvis",
            "zipcode": "53919-4257",
            "geo": {
                "lat": "29.4572",
                "lng": "-164.2990"
            }
        },
        "phone": "493-170-9623 x156",
        "website": "kale.biz",
        "company": {
            "name": "Robel-Corkery",
            "catchPhrase": "Multi-tiered zero tolerance productivity",
            "bs": "transition cutting-edge web services"
        }
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "address": {
            "street": "Skiles Walks",
            "suite": "Suite 351",
            "city": "Roscoeview",
            "zipcode": "33263",
            "geo": {
                "lat": "-31.8129",
                "lng": "62.5342"
            }
        },
        "phone": "(254)954-1289",
        "website": "demarco.info",
        "company": {
            "name": "Keebler LLC",
            "catchPhrase": "User-centric fault-tolerant solution",
            "bs": "revolutionize end-to-end systems"
        }
    },
    {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info",
        "address": {
            "street": "Norberto Crossing",
            "suite": "Apt. 950",
            "city": "South Christy",
            "zipcode": "23505-1337",
            "geo": {
                "lat": "-71.4197",
                "lng": "71.7478"
            }
        },
        "phone": "1-477-935-8478 x6430",
        "website": "ola.org",
        "company": {
            "name": "Considine-Lockman",
            "catchPhrase": "Synchronised bottom-line interface",
            "bs": "e-enable innovative applications"
        }
    },
    {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "address": {
            "street": "Rex Trail",
            "suite": "Suite 280",
            "city": "Howemouth",
            "zipcode": "58804-1099",
            "geo": {
                "lat": "24.8918",
                "lng": "21.8984"
            }
        },
        "phone": "210.067.6132",
        "website": "elvis.io",
        "company": {
            "name": "Johns Group",
            "catchPhrase": "Configurable multimedia task-force",
            "bs": "generate enterprise e-tailers"
        }
    },
    {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me",
        "address": {
            "street": "Ellsworth Summit",
            "suite": "Suite 729",
            "city": "Aliyaview",
            "zipcode": "45169",
            "geo": {
                "lat": "-14.3990",
                "lng": "-120.7677"
            }
        },
        "phone": "586.493.6943 x140",
        "website": "jacynthe.com",
        "company": {
            "name": "Abernathy Group",
            "catchPhrase": "Implemented secondary concept",
            "bs": "e-enable extensible e-tailers"
        }
    },
    {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io",
        "address": {
            "street": "Dayna Park",
            "suite": "Suite 449",
            "city": "Bartholomebury",
            "zipcode": "76495-3109",
            "geo": {
                "lat": "24.6463",
                "lng": "-168.8889"
            }
        },
        "phone": "(775)976-6794 x41206",
        "website": "conrad.com",
        "company": {
            "name": "Yost and Sons",
            "catchPhrase": "Switchable contextually-based project",
            "bs": "aggregate real-time technologies"
        }
    },
    {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "address": {
            "street": "Kattie Turnpike",
            "suite": "Suite 198",
            "city": "Lebsackbury",
            "zipcode": "31428-2261",
            "geo": {
                "lat": "-38.2386",
                "lng": "57.2232"
            }
        },
        "phone": "024-648-3804",
        "website": "ambrose.net",
        "company": {
            "name": "Hoeger LLC",
            "catchPhrase": "Centralized empowering task-force",
            "bs": "target end-to-end models"
        }
    } */
]);

const customUsers = {
    subscribe: users.subscribe,
    setUsers: (usersData) => {
        users.set(usersData);
    },
    addUser: () => {},
    updateUser: () => {},
    deleteUser: () => {}
};

export { customUsers as c, exclude as e, prefixFilter as p };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtc3RvcmUuODUyMDM0NjkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS9jb21tb24vZXhjbHVkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS9jb21tb24vcHJlZml4RmlsdGVyLmpzIiwiLi4vLi4vLi4vc3JjL3N0b3JlL3VzZXJzLXN0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBleGNsdWRlKG9iaiwga2V5cykge1xuICBsZXQgbmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICBjb25zdCBuZXdPYmogPSB7fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbmFtZSA9IG5hbWVzW2ldO1xuICAgIGNvbnN0IGNhc2hJbmRleCA9IG5hbWUuaW5kZXhPZignJCcpO1xuICAgIGlmIChcbiAgICAgIGNhc2hJbmRleCAhPT0gLTEgJiZcbiAgICAgIGtleXMuaW5kZXhPZihuYW1lLnN1YnN0cmluZygwLCBjYXNoSW5kZXggKyAxKSkgIT09IC0xXG4gICAgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBuZXdPYmpbbmFtZV0gPSBvYmpbbmFtZV07XG4gIH1cblxuICByZXR1cm4gbmV3T2JqO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHByZWZpeEZpbHRlcihvYmosIHByZWZpeCkge1xuICBsZXQgbmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICBjb25zdCBuZXdPYmogPSB7fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbmFtZSA9IG5hbWVzW2ldO1xuICAgIGlmIChuYW1lLnN1YnN0cmluZygwLCBwcmVmaXgubGVuZ3RoKSA9PT0gcHJlZml4KSB7XG4gICAgICBuZXdPYmpbbmFtZS5zdWJzdHJpbmcocHJlZml4Lmxlbmd0aCldID0gb2JqW25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdPYmo7XG59XG4iLCJpbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XHJcblxyXG5jb25zdCB1c2VycyA9IHdyaXRhYmxlKFtcclxuICAgIHtcclxuICAgICAgICBcImlkXCI6IDEsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiTGVhbm5lIEdyYWhhbVwiLFxyXG4gICAgICAgIFwidXNlcm5hbWVcIjogXCJCcmV0XCIsXHJcbiAgICAgICAgXCJlbWFpbFwiOiBcInNpbmNlcmVAYXByaWwuYml6XCIsXHJcbiAgICAgICAgXCJ3ZWJzaXRlXCI6IFwiaGlsZGVnYXJkLm9yZ1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImlkXCI6IDIsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiRXJ2aW4gSG93ZWxsXCIsXHJcbiAgICAgICAgXCJ1c2VybmFtZVwiOiBcIkFudG9uZXR0ZVwiLFxyXG4gICAgICAgIFwiZW1haWxcIjogXCJzaGFubmFAbWVsaXNzYS50dlwiLFxyXG4gICAgICAgIFwid2Vic2l0ZVwiOiBcImFuYXN0YXNpYS5uZXRcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAzLFxyXG4gICAgICAgIFwibmFtZVwiOiBcIkNsZW1lbnRpbmUgQmF1Y2hcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiU2FtYW50aGFcIixcclxuICAgICAgICBcImVtYWlsXCI6IFwibmF0aGFuQHllc2VuaWEubmV0XCIsXHJcbiAgICAgICAgXCJ3ZWJzaXRlXCI6IFwicmFtaXJvLmluZm9cIixcclxuICAgIH0sXHJcbiAgICAvKiB7XHJcbiAgICAgICAgXCJpZFwiOiA0LFxyXG4gICAgICAgIFwibmFtZVwiOiBcIlBhdHJpY2lhIExlYnNhY2tcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiS2FyaWFubmVcIixcclxuICAgICAgICBcImVtYWlsXCI6IFwiSnVsaWFubmUuT0Nvbm5lckBrb3J5Lm9yZ1wiLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgIFwic3RyZWV0XCI6IFwiSG9lZ2VyIE1hbGxcIixcclxuICAgICAgICAgICAgXCJzdWl0ZVwiOiBcIkFwdC4gNjkyXCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOiBcIlNvdXRoIEVsdmlzXCIsXHJcbiAgICAgICAgICAgIFwiemlwY29kZVwiOiBcIjUzOTE5LTQyNTdcIixcclxuICAgICAgICAgICAgXCJnZW9cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsYXRcIjogXCIyOS40NTcyXCIsXHJcbiAgICAgICAgICAgICAgICBcImxuZ1wiOiBcIi0xNjQuMjk5MFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGhvbmVcIjogXCI0OTMtMTcwLTk2MjMgeDE1NlwiLFxyXG4gICAgICAgIFwid2Vic2l0ZVwiOiBcImthbGUuYml6XCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiUm9iZWwtQ29ya2VyeVwiLFxyXG4gICAgICAgICAgICBcImNhdGNoUGhyYXNlXCI6IFwiTXVsdGktdGllcmVkIHplcm8gdG9sZXJhbmNlIHByb2R1Y3Rpdml0eVwiLFxyXG4gICAgICAgICAgICBcImJzXCI6IFwidHJhbnNpdGlvbiBjdXR0aW5nLWVkZ2Ugd2ViIHNlcnZpY2VzXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiaWRcIjogNSxcclxuICAgICAgICBcIm5hbWVcIjogXCJDaGVsc2V5IERpZXRyaWNoXCIsXHJcbiAgICAgICAgXCJ1c2VybmFtZVwiOiBcIkthbXJlblwiLFxyXG4gICAgICAgIFwiZW1haWxcIjogXCJMdWNpb19IZXR0aW5nZXJAYW5uaWUuY2FcIixcclxuICAgICAgICBcImFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICBcInN0cmVldFwiOiBcIlNraWxlcyBXYWxrc1wiLFxyXG4gICAgICAgICAgICBcInN1aXRlXCI6IFwiU3VpdGUgMzUxXCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOiBcIlJvc2NvZXZpZXdcIixcclxuICAgICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMzMyNjNcIixcclxuICAgICAgICAgICAgXCJnZW9cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsYXRcIjogXCItMzEuODEyOVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsbmdcIjogXCI2Mi41MzQyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwaG9uZVwiOiBcIigyNTQpOTU0LTEyODlcIixcclxuICAgICAgICBcIndlYnNpdGVcIjogXCJkZW1hcmNvLmluZm9cIixcclxuICAgICAgICBcImNvbXBhbnlcIjoge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJLZWVibGVyIExMQ1wiLFxyXG4gICAgICAgICAgICBcImNhdGNoUGhyYXNlXCI6IFwiVXNlci1jZW50cmljIGZhdWx0LXRvbGVyYW50IHNvbHV0aW9uXCIsXHJcbiAgICAgICAgICAgIFwiYnNcIjogXCJyZXZvbHV0aW9uaXplIGVuZC10by1lbmQgc3lzdGVtc1wiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImlkXCI6IDYsXHJcbiAgICAgICAgXCJuYW1lXCI6IFwiTXJzLiBEZW5uaXMgU2NodWxpc3RcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiTGVvcG9sZG9fQ29ya2VyeVwiLFxyXG4gICAgICAgIFwiZW1haWxcIjogXCJLYXJsZXlfRGFjaEBqYXNwZXIuaW5mb1wiLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgIFwic3RyZWV0XCI6IFwiTm9yYmVydG8gQ3Jvc3NpbmdcIixcclxuICAgICAgICAgICAgXCJzdWl0ZVwiOiBcIkFwdC4gOTUwXCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOiBcIlNvdXRoIENocmlzdHlcIixcclxuICAgICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMjM1MDUtMTMzN1wiLFxyXG4gICAgICAgICAgICBcImdlb1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxhdFwiOiBcIi03MS40MTk3XCIsXHJcbiAgICAgICAgICAgICAgICBcImxuZ1wiOiBcIjcxLjc0NzhcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBob25lXCI6IFwiMS00NzctOTM1LTg0NzggeDY0MzBcIixcclxuICAgICAgICBcIndlYnNpdGVcIjogXCJvbGEub3JnXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiQ29uc2lkaW5lLUxvY2ttYW5cIixcclxuICAgICAgICAgICAgXCJjYXRjaFBocmFzZVwiOiBcIlN5bmNocm9uaXNlZCBib3R0b20tbGluZSBpbnRlcmZhY2VcIixcclxuICAgICAgICAgICAgXCJic1wiOiBcImUtZW5hYmxlIGlubm92YXRpdmUgYXBwbGljYXRpb25zXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiaWRcIjogNyxcclxuICAgICAgICBcIm5hbWVcIjogXCJLdXJ0aXMgV2Vpc3NuYXRcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiRWx3eW4uU2tpbGVzXCIsXHJcbiAgICAgICAgXCJlbWFpbFwiOiBcIlRlbGx5LkhvZWdlckBiaWxseS5iaXpcIixcclxuICAgICAgICBcImFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICBcInN0cmVldFwiOiBcIlJleCBUcmFpbFwiLFxyXG4gICAgICAgICAgICBcInN1aXRlXCI6IFwiU3VpdGUgMjgwXCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOiBcIkhvd2Vtb3V0aFwiLFxyXG4gICAgICAgICAgICBcInppcGNvZGVcIjogXCI1ODgwNC0xMDk5XCIsXHJcbiAgICAgICAgICAgIFwiZ2VvXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibGF0XCI6IFwiMjQuODkxOFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsbmdcIjogXCIyMS44OTg0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwaG9uZVwiOiBcIjIxMC4wNjcuNjEzMlwiLFxyXG4gICAgICAgIFwid2Vic2l0ZVwiOiBcImVsdmlzLmlvXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiSm9obnMgR3JvdXBcIixcclxuICAgICAgICAgICAgXCJjYXRjaFBocmFzZVwiOiBcIkNvbmZpZ3VyYWJsZSBtdWx0aW1lZGlhIHRhc2stZm9yY2VcIixcclxuICAgICAgICAgICAgXCJic1wiOiBcImdlbmVyYXRlIGVudGVycHJpc2UgZS10YWlsZXJzXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiaWRcIjogOCxcclxuICAgICAgICBcIm5hbWVcIjogXCJOaWNob2xhcyBSdW5vbGZzZG90dGlyIFZcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiTWF4aW1lX05pZW5vd1wiLFxyXG4gICAgICAgIFwiZW1haWxcIjogXCJTaGVyd29vZEByb3NhbW9uZC5tZVwiLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgIFwic3RyZWV0XCI6IFwiRWxsc3dvcnRoIFN1bW1pdFwiLFxyXG4gICAgICAgICAgICBcInN1aXRlXCI6IFwiU3VpdGUgNzI5XCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOiBcIkFsaXlhdmlld1wiLFxyXG4gICAgICAgICAgICBcInppcGNvZGVcIjogXCI0NTE2OVwiLFxyXG4gICAgICAgICAgICBcImdlb1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxhdFwiOiBcIi0xNC4zOTkwXCIsXHJcbiAgICAgICAgICAgICAgICBcImxuZ1wiOiBcIi0xMjAuNzY3N1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGhvbmVcIjogXCI1ODYuNDkzLjY5NDMgeDE0MFwiLFxyXG4gICAgICAgIFwid2Vic2l0ZVwiOiBcImphY3ludGhlLmNvbVwiLFxyXG4gICAgICAgIFwiY29tcGFueVwiOiB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkFiZXJuYXRoeSBHcm91cFwiLFxyXG4gICAgICAgICAgICBcImNhdGNoUGhyYXNlXCI6IFwiSW1wbGVtZW50ZWQgc2Vjb25kYXJ5IGNvbmNlcHRcIixcclxuICAgICAgICAgICAgXCJic1wiOiBcImUtZW5hYmxlIGV4dGVuc2libGUgZS10YWlsZXJzXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiaWRcIjogOSxcclxuICAgICAgICBcIm5hbWVcIjogXCJHbGVubmEgUmVpY2hlcnRcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiRGVscGhpbmVcIixcclxuICAgICAgICBcImVtYWlsXCI6IFwiQ2hhaW1fTWNEZXJtb3R0QGRhbmEuaW9cIixcclxuICAgICAgICBcImFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICBcInN0cmVldFwiOiBcIkRheW5hIFBhcmtcIixcclxuICAgICAgICAgICAgXCJzdWl0ZVwiOiBcIlN1aXRlIDQ0OVwiLFxyXG4gICAgICAgICAgICBcImNpdHlcIjogXCJCYXJ0aG9sb21lYnVyeVwiLFxyXG4gICAgICAgICAgICBcInppcGNvZGVcIjogXCI3NjQ5NS0zMTA5XCIsXHJcbiAgICAgICAgICAgIFwiZ2VvXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibGF0XCI6IFwiMjQuNjQ2M1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsbmdcIjogXCItMTY4Ljg4ODlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBob25lXCI6IFwiKDc3NSk5NzYtNjc5NCB4NDEyMDZcIixcclxuICAgICAgICBcIndlYnNpdGVcIjogXCJjb25yYWQuY29tXCIsXHJcbiAgICAgICAgXCJjb21wYW55XCI6IHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiWW9zdCBhbmQgU29uc1wiLFxyXG4gICAgICAgICAgICBcImNhdGNoUGhyYXNlXCI6IFwiU3dpdGNoYWJsZSBjb250ZXh0dWFsbHktYmFzZWQgcHJvamVjdFwiLFxyXG4gICAgICAgICAgICBcImJzXCI6IFwiYWdncmVnYXRlIHJlYWwtdGltZSB0ZWNobm9sb2dpZXNcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJpZFwiOiAxMCxcclxuICAgICAgICBcIm5hbWVcIjogXCJDbGVtZW50aW5hIER1QnVxdWVcIixcclxuICAgICAgICBcInVzZXJuYW1lXCI6IFwiTW9yaWFoLlN0YW50b25cIixcclxuICAgICAgICBcImVtYWlsXCI6IFwiUmV5LlBhZGJlcmdAa2FyaW5hLmJpelwiLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgIFwic3RyZWV0XCI6IFwiS2F0dGllIFR1cm5waWtlXCIsXHJcbiAgICAgICAgICAgIFwic3VpdGVcIjogXCJTdWl0ZSAxOThcIixcclxuICAgICAgICAgICAgXCJjaXR5XCI6IFwiTGVic2Fja2J1cnlcIixcclxuICAgICAgICAgICAgXCJ6aXBjb2RlXCI6IFwiMzE0MjgtMjI2MVwiLFxyXG4gICAgICAgICAgICBcImdlb1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxhdFwiOiBcIi0zOC4yMzg2XCIsXHJcbiAgICAgICAgICAgICAgICBcImxuZ1wiOiBcIjU3LjIyMzJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBob25lXCI6IFwiMDI0LTY0OC0zODA0XCIsXHJcbiAgICAgICAgXCJ3ZWJzaXRlXCI6IFwiYW1icm9zZS5uZXRcIixcclxuICAgICAgICBcImNvbXBhbnlcIjoge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJIb2VnZXIgTExDXCIsXHJcbiAgICAgICAgICAgIFwiY2F0Y2hQaHJhc2VcIjogXCJDZW50cmFsaXplZCBlbXBvd2VyaW5nIHRhc2stZm9yY2VcIixcclxuICAgICAgICAgICAgXCJic1wiOiBcInRhcmdldCBlbmQtdG8tZW5kIG1vZGVsc1wiXHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5dKTtcclxuXHJcbmNvbnN0IGN1c3RvbVVzZXJzID0ge1xyXG4gICAgc3Vic2NyaWJlOiB1c2Vycy5zdWJzY3JpYmUsXHJcbiAgICBzZXRVc2VyczogKHVzZXJzRGF0YSkgPT4ge1xyXG4gICAgICAgIHVzZXJzLnNldCh1c2Vyc0RhdGEpO1xyXG4gICAgfSxcclxuICAgIGFkZFVzZXI6ICgpID0+IHt9LFxyXG4gICAgdXBkYXRlVXNlcjogKCkgPT4ge30sXHJcbiAgICBkZWxldGVVc2VyOiAoKSA9PiB7fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tVXNlcnM7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFPLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDbkMsRUFBRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsRUFBRSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDcEI7QUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLElBQUksTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLElBQUksTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxJQUFJO0FBQ0osTUFBTSxTQUFTLEtBQUss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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsQ0FBQztBQUNIO0FBQ0ssTUFBQyxXQUFXLEdBQUc7QUFDcEIsSUFBSSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7QUFDOUIsSUFBSSxRQUFRLEVBQUUsQ0FBQyxTQUFTLEtBQUs7QUFDN0IsUUFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLEtBQUs7QUFDTCxJQUFJLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDckIsSUFBSSxVQUFVLEVBQUUsTUFBTSxFQUFFO0FBQ3hCLElBQUksVUFBVSxFQUFFLE1BQU0sRUFBRTtBQUN4Qjs7OzsifQ==
