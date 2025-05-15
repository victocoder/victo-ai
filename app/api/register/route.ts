
export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Here you would typically hash the password and save the user to your database
  // For demonstration purposes, we'll just return the email and password

  return new Response(
    JSON.stringify({
      message: "User registered successfully",
      user: {
        email,
        password,
      },
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}