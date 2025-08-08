# Authentication
___
Authentication is handled with Discord via [AuthJS](https://authjs.dev). Once a user has successfully
completed the auth flow, a JWT is generated with their account information and encrypted Discord access
token and is stored as an HttpOnly cookied called `netslum-token`. This token can be used to interact with
protected routes within the FragmentServer API.

The keys used sign the JWT and encrypt the access token inside of the JWT claims is defined by
the `JWT_SECRET` environment variable. You **must** ensure that this secret is configured for both
the web-app, and the associated backend services (Eg: The [FragmentServer](https://github.com/PSRewired/FragmentServer) backend.)
in order for the backend to correctly verify the JWT tokens.

