# API LAYOUT

## MODELS

- User
  - email,
  - username (?),
  - first name,
  - last name,
  - bio,
  - profile image,
  - organization (rel Organization),
  - posts ([ ]rel Post)
- Post
  - author (rel User),
  - title,
  - content (either image/text, might have separate)
  - upvotes/downvotes,
  - comments ([ ]rel Comment)
- Comment
  - author (rel User),
  - content,
  - upvotes/downvotes
- Organization
  - name,
  - domain,
  - feed ([ ] rel Posts)

## Routes

- Auth
  - Login (POST): Takes in `'email'` and `'password'` in body. If they are valid, an object with a token and expiresIn property are returned. Every authenticated request after should have the token in the Authorization Header of its request. The header field should be formatted as:
    ```
    {
      "Authorization": "Bearer <token>",
      ...<other headers>
    }
    ```
  - Signup (PUT): Takes in `'first_name'`, `'last_name'`, `'email'` and `'password'` in body. If valid, returns userId of created user.
  - Reset
  - Verify
  - updateUser
  - getProfile
- Feed
  - getPosts
  - getPost
  - postPost
  - updatePost
  - deletePost
- Admin
  - getOrgs
  - getOrg
  - postOrg
  - updateOrg
