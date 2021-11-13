const usersRouter = require('./users');
const exercisesRouter = require('./exercises');
const workoutsRouter = require('./workouts');
const programsRouter = require('./programs');

function router(app) {
    app.use('/api/users', usersRouter);
    app.use('/api/exercises', exercisesRouter);
    app.use('/api/workouts', workoutsRouter);
    app.use('/api/programs', programsRouter);

    app.use('/', (req, res) => {
        res.json({ msg: 'API of project Klos' });
    });
}

module.exports = router;
