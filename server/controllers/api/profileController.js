function update(req, res, next) {
    const data = req.body;

    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    // Save the data to the database.
    // getModel().create(data, (err, savedData) => {
    //     if (err) {
    //         next(err);
    //         return;
    //     }
    //     res.redirect(`${req.baseUrl}/${savedData.id}`);
    // });
}
// [START add]

// [END add]
module.exports = {
    update
};
