const User = require("../Model/user");

exports.signup = async (name, email, parentCode, password, referCode) => {
  try {
    const user = new User({ name, email, parentCode, password, referCode });

    if (!user) {
      throw new Error(`Error creating the user.`);
    }

    const parentUser = await User.findOne({ referCode: parentCode }); // Find the parent by referCode

    if (parentUser) {
      const currentDate = new Date("02-10-2023");
      const nationalDate = [new Date("02-10-2023"), "15-08-2023"];

      const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.

      let parentReferralBonus = 0;
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Sunday
        // parentReferralBonus = 200;
        // } else if (dayOfWeek === 6) {
        //   // Saturday
        parentReferralBonus = 100;
      } else {
        // Weekdays
        parentReferralBonus = 50;
      }
      if (nationalDate.includes(currentDate)) {
        parentReferralBonus = 200;
      }
      if (parentUser.childrenUser.length === 0) {
        parentUser.referralBonus += parentUser.referralBonus;
      } else if (parentUser.childrenUser.length === 1) {
        parentUser.referralBonus += parentUser.referralBonus / 2;
      } else if (parentUser.childrenUser.length === 3) {
        parentUser.referralBonus += parentUser.referralBonus / 10;
      }

      parentUser.referralBonus += parentReferralBonus;
      parentUser.childrenUser.push(user._id); // Add the child's _id to the parent's childrenUser array

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
exports.addrefer = async (parentCode, _id) => {
  try {
    const user = await User.findById(_id);

    if (!user) {
      return `User not found`;
    }

    if (user.role === "Admin") {
      user.parentCode = parentCode;
      await user.save();
      return `Parent code set successfully`;
    } else {
      return `User is not an admin`;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
