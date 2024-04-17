const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateUserLevel = functions.firestore
    .document("users/{userId}")
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const previousData = change.before.data();

        // Check if memberPoints field has changed
        if (newData.memberPoints !== previousData.memberPoints) {
            const userId = context.params.userId;
            const memberPoints = newData.memberPoints;
            const currentLevel = newData.level;

            // Define thresholds for leveling up
            const bronzeThreshold = 1500;
            const silverThreshold = 3500;

            let newLevel;

            // Check if user meets criteria for leveling up
            if (memberPoints >= silverThreshold && currentLevel === "silver") {
                newLevel = "gold";
            } else if (
                memberPoints >= bronzeThreshold &&
                currentLevel === "bronze"
            ) {
                newLevel = "silver";
            } else {
                // User does not meet criteria for leveling up
                return null;
            }

            // Update user's level
            await admin
                .firestore()
                .collection("users")
                .doc(userId)
                .update({ level: newLevel });
            console.log(`User ${userId} leveled up to ${newLevel}`);
        }
    });
