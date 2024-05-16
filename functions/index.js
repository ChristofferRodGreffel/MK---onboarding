const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateUserLevel = functions.firestore.document("users/{userId}").onUpdate(async (change, context) => {
  const newData = change.after.data();
  const previousData = change.before.data();

  // Check if memberPoints field has changed
  if (newData.memberPoints !== previousData.memberPoints) {
    const userId = context.params.userId;
    const memberPoints = newData.memberPoints;
    const previousLevel = previousData.level;

    // Define thresholds for leveling up
    const silverThreshold = 2499;
    const goldThreshold = 4999;

    let newLevel = null;

    switch (previousLevel) {
      case "bronze":
        if (memberPoints >= goldThreshold) {
          newLevel = "gold";
        } else if (memberPoints >= silverThreshold) {
          newLevel = "silver";
        }
        break;
      case "silver":
        if (memberPoints >= goldThreshold) {
          newLevel = "gold";
        } else if (memberPoints < silverThreshold) {
          newLevel = "bronze";
        }
        break;
      case "gold":
        if (memberPoints < silverThreshold) {
          newLevel = "bronze";
        } else if (memberPoints < goldThreshold) {
          newLevel = "silver";
        }
        break;
      default:
        // User's current level is not recognized, do nothing
        return null;
    }

    // Update user's level if newLevel is not null
    if (newLevel !== null) {
      await admin.firestore().collection("users").doc(userId).update({ level: newLevel });
    }
  }
});
