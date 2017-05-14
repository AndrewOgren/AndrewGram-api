## lab5 - Backend to blog - V2
In the part of the lab, on the backend, I added a user model to allow for user authentication through signing up/in on the
frontend. The passwords are hashed and 'salted' for security, and when a user signs in, this hashed and 'salted' password is compared with the one in the database. We also added passport.js middleware, which we then use to make sure that a user is
authenticated before adding, deleting, or updating a post. I had some difficulties with returning the token to the user, but this was fixed. Now, whenever a user posts, it displays their name under the title. Also, it displays their name next to any comments that they add.

##Extra Credit
None - Ain't Nobody Got Time For That
