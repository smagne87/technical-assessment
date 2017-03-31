module.exports = (mongoose) => {
    var articleSchema = mongoose.Schema({
        _userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: String,
        text: String,
        tags: [String]
    });

    var models = { Article: {} };
    if (!mongoose.model.Article) {
        models.Article = mongoose.model('Article', articleSchema);
    }
    return models;
}