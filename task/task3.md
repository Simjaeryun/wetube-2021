QUESTION 1 OF 15
CORRECT
A server is a computer listening for requests.
Yes.

QUESTION 2 OF 15
CORRECT
When we go to google.com is the same as going to google.com/

Yes.
QUESTION 3 OF 15
CORRECT
When we go to google.com with our browser what kind of request are we making?

GET request
QUESTION 4 OF 15
CORRECT
A GET request happens when the user wants to sends data to the server.

No.
QUESTION 5 OF 15
CORRECT
What is the first argument given to our route handlers?

The request object
QUESTION 6 OF 15
CORRECT
What is the second argument given to our route handlers?

The response object
QUESTION 7 OF 15
CORRECT
What can we find inside the request object?

Information about the request the user is making.
QUESTION 8 OF 15
CORRECT
What can we find inside the response object?

Functions to respond to the user.
QUESTION 9 OF 15
CORRECT
What is a route handler?

The function called when the user goes to a URL
QUESTION 10 OF 15
CORRECT
What is a middleware?

A function that runs between the request and the response to the user.
QUESTION 11 OF 15
CORRECT
What is the third argument given to our handlers?

The next() function
QUESTION 12 OF 15
CORRECT
How can a middleware move on to the next handler?

Call the next() function
QUESTION 13 OF 15
CORRECT
How can I make a middleware run for every route?

app.use(myMiddleware)
QUESTION 14 OF 15
CORRECT
How can I make a middleware run only for one route.

app.get("/", myMiddleware, myHandler)
QUESTION 15 OF 15
CORRECT
Middlewares will always call the function next()

No.