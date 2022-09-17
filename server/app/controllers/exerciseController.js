const Exercise = require('../models/Exercise');
const FavoriteExercise = require('../models/FavoriteExercise');

const exerciseController = {
    getAll: async (req, res) => {
        try {
            const { level, muscle, equipment } = req.query;
            let { search } = req.body;

            let exercises = await Exercise.find({});
            const favoriteExercises = await FavoriteExercise.find({});

            if (level) {
                exercises = exercises.filter((item) => {
                    if (item.levels.find((subItem) => subItem == level))
                        return true;
                    else return false;
                });
            }

            if (muscle) {
                exercises = exercises.filter((item) => {
                    if (item.muscleGroups.find((subItem) => subItem == muscle))
                        return true;
                    else return false;
                });
            }

            if (equipment) {
                if (equipment == 0) {
                    exercises = exercises.filter((item) => {
                        if (item.equipments.length == 0) return true;
                        else return false;
                    });
                } else {
                    exercises = exercises.filter((item) => {
                        if (item.equipments.length != 0) return true;
                        else return false;
                    });
                }
            }

            if (search) {
                search = removeVietnameseTones(search);
                exercises = exercises.filter((item) => {
                    return removeVietnameseTones(item.name).includes(search);
                });
            }

            const user = req.user;
            if (user) {
                exercises.forEach((exercise) => {
                    let favorite = favoriteExercises.find(
                        (item) =>
                            item.exercise.equals(exercise._id) &&
                            item.user.equals(user._id)
                    );
                    if (favorite) exercise.liked = true;
                    else exercise.liked = false;
                });
            }

            exercises.forEach((exercise) => {
                let favorites = favoriteExercises.filter((item) =>
                    item.exercise.equals(exercise._id)
                );

                let count = favorites.length;
                exercise.likes = count;
            });

            return res.json({ exercises });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const exercise = await Exercise.findOne({ _id: id });

            const favoriteExercises = await FavoriteExercise.find({});
            let favorites = favoriteExercises.filter((item) =>
                item.exercise.equals(exercise._id)
            );
            let count = favorites.length;
            exercise.likes = count;

            const user = req.user;
            if (user) {
                let favorite = favoriteExercises.find(
                    (item) =>
                        item.exercise.equals(exercise._id) &&
                        item.user.equals(user._id)
                );
                if (favorite) exercise.liked = true;
                else exercise.liked = false;
            }

            return res.json({ exercise });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, image, videoUrl, levels, muscleGroups, equipments } =
                req.body;

            const exercise = new Exercise();

            exercise.name = name;
            exercise.image = image;
            exercise.videoUrl = videoUrl;
            exercise.levels = levels;
            exercise.muscleGroups = muscleGroups;
            exercise.equipments = equipments;

            await exercise.save();

            return res.json({ exercise });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

function removeVietnameseTones(str) {
    str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
    );
    return str;
}

module.exports = exerciseController;
