success = (message, data, res) => {
    return res.status(200).json({
        message: message,
        data: data
    });
};

error = (message, data, res) => {
    return res.status(400).json({
        message: message,
        data: data
    });
};

module.exports = {
    success,
    error
};
