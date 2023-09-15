const User = require("../../models/User");
const responseHandler = require("../../shared/utils/responseHandler");

///////////////////////////////geting all userz /////////////////////
exports.getAllUsers = async (req, res) => {
  try {
    let { page, perPage } = req.query;
    page = page || 1;
    perPage = perPage || 2;
    const pipeline = [
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: (page - 1) * Number(perPage) },
            { $limit: Number(perPage) },
            { $project: { email: 1, _id: 0 } },
          ],
        },
      },
    ];
    
    let allUsers = await User.aggregate(pipeline).exec();
    responseHandler.success(res, {
      usersList: [...allUsers[0]?.data],
      totalUsers: allUsers[0]?.metadata[0]?.total,
    });
  } catch (error) {
    responseHandler.fail(res, error.message);
  }
};

////////////////////////getting logged In user with age //////////////
exports.getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;
    const pipeline = [
      {
        $match: { _id: user._id },
      },
      {
        $project: {
            name: 1,
            email: 1,
          ageInYears: {
            $floor: {
              $divide: [
                {
                  $subtract: [new Date(), '$birthDate'],
                },
                365 * 24 * 60 * 60 * 1000,
              ],
            },
          },
        },
      },
    ];

    const result = await User.aggregate(pipeline);

    if (result.length === 0) {
        responseHandler.fail(res, "User Not Found", {}, 401);
    }
    const userData = result[0];
    responseHandler.success(res, userData);

  } catch (error) {
    responseHandler.fail(res, error.message, {}, 401);
  }
};
