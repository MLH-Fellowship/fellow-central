<div align="left">
  <img width="400" alt="League of Fellows" src=https://i.ibb.co/fCFjywf/Fellow-Stories-Logo.png">
</div>

# League of Fellows

Earn points for yourself and your pod during the MLH Fellowship. A way to gamify the fellowship experience.

<div align="center">
  <img width="680" alt="League of Fellow" src="https://i.ibb.co/WKNqsph/Fellow-Dashboard.png">
</div>

<br /><br />

![Forks](https://img.shields.io/github/forks/MLH-Fellowship/fellow-central?style=social) ![Stars](https://img.shields.io/github/stars/MLH-Fellowship/fellow-central?style=social) ![Watchers](https://img.shields.io/github/watchers/MLH-Fellowship/fellow-central?style=social) ![Top Language](https://img.shields.io/github/languages/top/MLH-Fellowship/fellow-central) ![Languages](https://img.shields.io/github/languages/count/MLH-Fellowship/fellow-central) ![Issues](https://img.shields.io/github/issues/MLH-Fellowship/fellow-central) ![PRs](https://img.shields.io/github/issues-pr-raw/MLH-Fellowship/fellow-central) ![MIT License](https://img.shields.io/github/license/MLH-Fellowship/fellow-central) ![activity](https://img.shields.io/github/commit-activity/m/MLH-Fellowship/fellow-central) ![contributors](https://img.shields.io/github/contributors-anon/MLH-Fellowship/fellow-central) ![size](https://img.shields.io/github/languages/code-size/MLH-Fellowship/fellow-central) ![lines](https://img.shields.io/tokei/lines/github/MLH-Fellowship/fellow-central)

## Browser Support
- **Firefox**:	version 50 and up
- **Chrome**:	version 49 and up
- **Safari**:	version 10 and up
- **Internet Explorer**:	version 10 and up
- **Edge**:	version 14 and up

> **Note**: Support for modern mobile browsers is experimental. The website is not responsive in mobile devices until now.

## Inspiration

During the fellowship, some fellows might lack the incentive to attend informative talks, book mentor sessions, give a show and tell, interact with other fellows on discord, etc.

**League of Fellows** aims to gamify the MLH Fellowship experience by allowing fellows and their pods to earn points for doing various activities throughout the fellowship similar to MLH Local Hack Day. These accumulated points could potentially be used to redeem swag and secret rewards at the end of the fellowship.

Activities that counts towards points include attending events, livestreams, interacting on discord, mentor sessions, show and tells, winning hackathons, helping others in the fellowship community.

> ### Make everything you do in the fellowship count!

## How we built it

- **Frontend**: React, Redux

    ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

- **Backend**: Python, Flask

    ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/Python-2E6693?style=for-the-badge&logo=python&logoColor=F7CD39) ![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)

- **Design**: Figma

    ![Figma](https://img.shields.io/badge/figma%20-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white)

- **Version Control**: Git and GitHub

    ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

- **Database**: PostgreSQL
    
    ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

- **Web Hosting**: Netlify, Heroku

    ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) 

## What it does
- Discord bot to tracks points earned by each registered fellow on the MLH Fellowship discord
- Web app to display helpful metrics, such as individual points earned, points earned by your pod, your pod's rank on a modern dashboard
- Leaderboards that visualizes points earned by different pods and where your pod stands
- Generates secret codes for each event that admin can give out during livestreams and events for fellows to redeem for points.
- View upcoming and past events in a central place and earn points for participanting in them
- Easy Login and Registration with Discord OAuth Login

## Challenges we ran into

  1. Generating ideas for how fellows could earn points was a bit tricky as we did't want there to be any sort of spamming going on.
  1. The DB we used, PostgresSQL, was something new for most of us on the team and a challenge setting up. At the end, we all learnt a lot about working with relational databases.
  1. Designing the REST API to fit the need of the frontend and the discord bot was a challenging task and required most of our time.
  1. Setting up Discord OAuth and making the platform work seemlessly between backend, the frontend React app and the discord bot was daunting and required planning beforehand to decide on the architecture, and technologies that would make it all work.
  1. Time management was really challenging due to the largely varying timezones of team members. :P
  
## Accomplishments that we're proud of

  1. Building a platform that could drive more engagement from fellows.
  2. Creating a points management system that could be scaled to add more features and platform integrations
  3. Learning about building discord bots and OAuth and working with PostgreSQL

## What we learned
  1. We learnt about working with Redux on the frontend, the benefits of using it, and scaling the application state with ease.
  1. We learnt about and benefits and pitfalls of using relational databases and how modelling data is very different from NoSQL databases.
  1. We had a meeting everyday at a fixed time to plan divide work and check on each others progress which helped us in understanding more about collaboration on an open source project.
  1. We learned and implemented open source best practices like making use of GitHub project board, setting up branch protection rules, adding Issue/PR templates, and following a consistent style for writing commit messages etc.


## What's next for League of Fellow

- [ ] GitHub integration for tracking weekly GitHub activity
- [ ] Automation of Event creation via Google Calendar
- [ ] Option to customize and manage favorite content on dashboard using drag and drop controls
- [ ] More metrics and visualizations for fellows to track their progress throughout the fellowship
- [ ] Marketplace for redeeming points for rewards or swag

## How to Get Started?

[![Dependencies Up To Date](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)](https://github.com/MLH-Fellowship/fellow-central/blob/main/package.json)
[![Python](https://img.shields.io/badge/python-v3.7-blue)](https://www.python.org/downloads/)

### GitHub Repository Structure

|   #   | Directory Name                                                                        | Purpose                   |
| ----- | ------------------------------------------------------------------------------------- | ------------------------- |
| 1.    | [frontend](https://github.com/MLH-Fellowship/fellow-central/tree/main/frontend)       | contains frontend code    |
| 2.    | [backend](https://github.com/MLH-Fellowship/fellow-central/tree/main/backend)         | contains backend code     |
| 3.    | [discord-bot](https://github.com/MLH-Fellowship/fellow-central/tree/main/discord-bot) | contains discord bot code |

### Setup

Read `README.md` file of appropriate directories to setup the project environment.

- [Frontend](https://github.com/MLH-Fellowship/fellow-central/tree/main/frontend)
- [Backend](https://github.com/MLH-Fellowship/fellow-central/tree/main/backend)
- [Discord Bot](https://github.com/MLH-Fellowship/fellow-central/blob/main/discord-bot)

## MLH Fellowship (Spring 2021)

> This is a hackathon project made by MLH Open Source Fellows (Spring 2021) for the halfway hackathon.

[![MLH Fellowship](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/challenge_photos/001/380/537/datas/full_width.png)](https://github.com/MLH-Fellowship)

## Team:

> "None of us is as smart as all of us." --Ken Blanchard

| # | Name               | Role               | GitHub Username                                |
| ----- | ------------------ | ------------------ | ---------------------------------------------- |
| 1.    | Pawan Kolhe        | Frontend Developer | [@PawanKolhe](https://github.com/PawanKolhe)   |
| 2.    | Chau Vu            | Backend Developer | [@cqvu](https://github.com/cqvu)               |
| 3.    | Boyuan Liu         | Backend Developer  | [@boyuan12](https://github.com/boyuan12)       |
| 4.    | Luis Zugasti       | Backend Developer  | [@luiszugasti](https://github.com/luiszugasti) |

<br>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody><tr>
    <td align="center"><a href="https://pawankolhe.com/"><img alt="" src="https://avatars.githubusercontent.com/u/8324407?s=400&u=d3decb2836a3b6400c11bc455507dcfc8479f8f9&v=4" width="100px;"><br><sub><b>Pawan Kolhe</b></sub></a><br><a href="https://github.com/MLH-Fellowship/fellow-central/commits?author=PawanKolhe" title="Code&Design&Docs">💻 🎨 📝</a></td>
    <td align="center"><a href="https://github.com/cqvu"><img alt="" src="https://avatars.githubusercontent.com/u/37096589?s=460&u=3eb5b6c62294c0519786997ef4b7caabc2ad7402&v=4" width="100px;"><br><sub><b>Chau Vu</b></sub></a><br><a href="https://github.com/MLH-Fellowship/fellow-central/commits?author=cqvu" title="Code&Docs">💻 📝</a></td>
    <td align="center"><a href="https://boyuan12.me/"><img alt="" src="https://avatars.githubusercontent.com/u/50649079?s=400&v=4" width="100px;"><br><sub><b>Boyuan Liu</b></sub></a><br><a href="https://github.com/MLH-Fellowship/fellow-central/commits?author=boyuan12" title="Code&Bot">💻 🤖</a></td>
    <td align="center"><a href="https://luiszugasti.me/"><img alt="" src="https://avatars.githubusercontent.com/u/11198457?s=400&u=0645b72683e491824aca16db9702f1d3eb990389&v=4" width="100px;"><br><sub><b>Luis Zugasti</b></sub></a><br><a href="https://github.com/MLH-Fellowship/fellow-central/commits?author=luiszugasti" title="Code">💻</a></td>

  </tr>
</tbody></table>


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[![ForTheBadge uses-git](http://ForTheBadge.com/images/badges/uses-git.svg)](https://github.com/MLH-Fellowship/fellow-central)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://github.com/MLH-Fellowship/fellow-central)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://github.com/MLH-Fellowship/fellow-central)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://github.com/MLH-Fellowship/fellow-central)
[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://github.com/MLH-Fellowship/fellow-central)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/MLH-Fellowship/fellow-central)

[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)

---

## Licensing

This software is open source, licensed under the [MIT License](https://github.com/MLH-Fellowship/fellow-central/blob/main/LICENSE).
