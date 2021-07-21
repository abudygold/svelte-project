import users from '../../../store/users-store';

const lookup = new Map();

users.subscribe(items => {
    items.forEach(user => {
        lookup.set(user.id, JSON.stringify(user));
    });
});

export function get(req, res, next) {
    const { id } = req.params;

    if (lookup.has(Number(id))) {
        res.writeHead(200, {
			'Content-Type': 'application/json'
        });

        res.end(lookup.get(Number(id)));
    } else {
        res.writeHead(404, {
			'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
			message: `Not found`
		}));
    }
}
