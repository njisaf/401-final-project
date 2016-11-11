## Readme Version 0.1

**This App uses coverall.io to monitor code coverage:**

[![Coverage Status](https://coveralls.io/repos/github/kaylynyuh/401-mid-quarter-project/badge.svg?branch=staging-branch)](https://coveralls.io/github/kaylynyuh/401-mid-quarter-project?branch=staging-branch)

# \<heretogether\>

\<heretogether\> is a social media platform for patients staying in pediatric hospitals under long-term care. The purpose of the application is to easily connect these children to one another through a single platform that can act as an avenue through which they can reach out to others, share experiences, and ultimately, be accompanied through their journeys together.

# About the App

The program uses it's own Express API that authorizes new and returning users granting them access to CRUD operations that enable the user to follow other users, create profiles, post statuses, and upload photos. The app uses Express to respond to and route HTTP methods appropriately from client requests at a particular endpoint. The specified models are created via mongoose which map to a mongoDB collection and define the shape of the documents within that collection. A user will authenticate by passing in a valid name, email, and a password and will get back a token upon success. JSON web tokens is used to validate tokens which allows information to be passed back and fourth in JSON format if the token is good. The program is compatible with AWS and uses it to store uploaded images.

## Team

Kaylyn Yuh https://github.com/kaylynyuh

Judy Vue https://github.com/JudyVue

Nassir Isaf https://github.com/njisaf


*See package.json for required dependencies and devdependencies*

*See the Wiki for more on how to interact with the app*
