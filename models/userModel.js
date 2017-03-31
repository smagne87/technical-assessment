module.exports = (mongoose) => {
    var userSchema = mongoose.Schema({
        name: String,
        avatar: String
    });

    var models = { User: {} };
    if (!mongoose.model.User) {
        models.User = mongoose.model('User', userSchema);
    }
    return models;
};