module.exports = {
    success: function (res, data = null, message = '', status = 200) {
      return res.status(status).json({
        success: true,
        status,
        data,
        message,
      });
    },
  
    fail: function (res, message = '', error = null, status = 400) {
      return res.status(status).json({
        success: false,
        status,
        message: message ? message : 'Error message',
        errors: error ? error : null,
      });
    },
  };