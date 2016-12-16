# project2
GA WDIR Project 2

**TECHNOLOGIES USED**
- node.js
- express
- mongoose
- ejs
- bootstrap & raw css

**APPROACH TAKEN**
I wanted to create an interactive app that includes full CRUD for at least 2 models. With Cheerups, users can create an account, sign in, post new cheerups, edit/delete their own cheerups, cheer for (upvote) any cheerups that they especially like, view all cheerups by 'most cheered', view a randomly generated cheerup to get inspired ('inspire me!' button), and of course view all users' cheerups. As of now, full CRUD is working for both models. There are some bugs I'd like to fix, but right now, things look decent (app is deployed on Heroku). The app uses both Bootstrap and raw CSS for styling.

**THINGS I'D LIKE TO ADD**
(see notes to self below for a more detailed overview)
- password encryption with bcrypt
- giphy/image API
- Build out my app.js within my public folder to manipulate the DOM with jquery and make things that much more interactive
- use EJS partials for the nav bars that are consistent (most pages within the app)

**NOTES TO SELF**
MUST FIX
- ~~when you delete a user, their cheerups still remain~~ FIXED
- ~~character limit on body seemingly not working~~ FIXED
- visualmedia vs. img OR iframe in schema
- ~~when logged in, the 'register' link shouldn't show; 'log out' link should show~~ FIXED
- ~~'created on' should look way prettier~~ FIXED with moment node package
- keyword aggregators:
  - could not quite figure out how to aggregate all posts that contain the same keyword.
  - on my mostcheered page, cheerups that have more than 2 keywords are represented with spaces in between each character.
  - pushing 'createdCheerup' into the foundUser's cheerupPage array does not create an array with separate elements, it creates an array with ONE element. I tried pushing req.body in, but that led to userId property being lost.
- maxlength 139 is still not working even though it's in the schema and in the text box
- the styling needs to be worked on so that the text displays evenly
- mongo alphabetizes, but it is case sensitive. I tried putting in req.body.username = req.body.username.toLowerCase(); which rendered the username all lowercase, but then once the user signs in, the username is uppercase again.

TO WORK ON
- showing all cheerups of a certain keyword
- ~~upvote/cheer button~~ Made a route to sort cheerups by number of cheers and display them in descending order!
- ~~showing a random cheerup's show page~~ ('inspire me button')
- password encryption
- log in with Facebook/Google
- incorporating the giphy api
- incorporating partials so that I don't need to repeat my header on every page

**USER STORIES**
- log in/sign up
- be able to write a cheerup
- view a cheerup individually
- view a user's page of all posted cheerups
- view most cheered cheerups
- get inspired by a random cheerup
- see an index of all posted cheerups without having to sign in
