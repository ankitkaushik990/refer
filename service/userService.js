const User = require("../Model/user");

exports.signup = async (name, email, referralCode) => {
  try {
    const user = new User({ name, email, referralCode });

    if (!user) {
      throw new Error(`Error creating the user.`);
    }

    const parentUser = await User.findOne({ referralCode });

    if (parentUser) {
      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.

      let parentReferralBonus = 0;
      if (dayOfWeek === 0) {
        // Sunday
        parentReferralBonus = 200;
      } else if (dayOfWeek === 6) {
        // Saturday
        parentReferralBonus = 100;
      } else {
        // Weekdays
        parentReferralBonus = 50;
      }

      parentUser.referralBonus += parentReferralBonus;
      parentUser.childrenUser.push(user._id);

      // Save the parent user and the new user
      await Promise.all([parentUser.save(), user.save()]);
    } else {
      // If no parent user is found, save only the new user
      await user.save();
    }

    return user._id;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getall = async () => {
  const alluser = await User.find();
  return alluser;
};

exports.byid = async (_id) => {
  const user1 = await User.findById(_id);
  return user1;
};
