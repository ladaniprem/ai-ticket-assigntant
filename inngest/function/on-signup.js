import { NonRetriableError } from "@inngest/node";
import inngest from "../client";
import User from "../models/User";
import { sendMail } from "../../utils/mailer";

export const onUserSignup = inngest.createFunction(
    {
        id: "On User Signup",
        retries: 2,
        event: "user/signup",
        fn: async ({ event, step }) => {
            try {
                const { email } = event.data;
                const user = await step.run("get-user-email", async () => {
                    const userObject = await User.findOne({
                        email
                    });
                    if (!userObject) {
                        throw new NonRetriableError("User no longer exists");
                    }
                    return userObject;
                });
                await step.run("send-welcome-email", async () => {
                    const subject = "Welcome to Inngest Ticketing System";
                    const text = `Hi ${user.name},\n\nWelcome to Inngest Ticketing System! We're excited to have you on board.\n\nBest regards,\nThe Inngest Team`;
                    await sendMail(user.email, subject, text);
                });
                return {
                    success: true,
                };
            } catch (error) {
                console.error("Error in onUserSignup function:", error.message);
                return {
                    success: false,
                    error: error.message,
                };
            }
        }
    }
);