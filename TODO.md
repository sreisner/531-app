- Figure out how to display the app bar automatically for all private routes
- Figure out how to avoid hitting the API every time the page loads to
  determine if a user is logged in or not.  Maybe we can just check the session
  and its expiration date?  There's an issue where if you're on a private route
  such as /home, and you refresh the browser window, it redirects the user to
  /login temporarily while the full page loading screen is up, then it takes
  them back to the page they were on, which is technically fine, but seems less
  than ideal