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
  - Login
  - Signup
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
