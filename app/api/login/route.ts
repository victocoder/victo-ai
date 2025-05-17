import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export async function POST(req: Request) {
    const { email, password, name, image } = await req.json();

    // Here you would typically hash the password and save the user to your database
    // For demonstration purposes, we'll just return the email and password
    const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: true
    }, {
        //callbacks
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            
        },
        onError: (ctx) => {
            // display the error message
        },
    })
    if (error) {
        return new Response(
            JSON.stringify({
                message: "Could not register user",
                error: error.message
            }),
            {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    if (data) {
        return new Response(
            JSON.stringify({
                message: "User login in successfully",
                logindata: data
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

}