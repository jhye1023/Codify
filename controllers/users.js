const { Router } = require('express');
const { User } = require('../models');
const { buildFilter } = require('../utils/queryHelper');
const { dropUndefined } = require('../utils/dropUndefined');

const router = Router();

router.get('/', async (request, response) => {
	const {
		query: { displayName, email, createdAt, updatedAt }
	} = request;

	const filter = buildFilter({ displayName, email, createdAt, updatedAt });

	const users = await User.find(filter.length ? { $and: filter } : {});

	response.send(users);
});

router.get('/:id', async (request, response) => {
	const { id } = request.params;
	const user = await User.findById(id);

	if (!user) {
		response.status(404).send({ error: 'User not found!' });
	}

	response.send(user);
});

router.put('/:id', async (request, response) => {
	const { id } = request.params;
	const { displayName, email } = request.body;
  const updatedUserInfo = dropUndefined({ displayName, email });
  
	let updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, { new: true });
	response.json(updatedUser);
});

router.delete('/:id', async (request, response) => {
	const { id } = request.params;
	const deleted = await User.findByIdAndDelete(id);

	if (!deleted) {
		response.status(404).send({ error: 'User not found!' });
	}

	response.send({ deleted });
});

module.exports = router;
