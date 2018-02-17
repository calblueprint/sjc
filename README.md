# SJC Portal

<img src="https://i.imgur.com/xJZaHmK.png" height="120" alt="SJC Logo" /><br />
[Social Justice Collaborative](http://socialjusticecollaborative.org/) is a nonprofit organization with the mission to protect and advance the rights of immigrants and their families through legal representation in immigration and criminal court.

About Blueprint
---
<img src="https://i.imgur.com/W9ankhO.png" width="120" alt="Blueprint logo" /><br />
[Blueprint](http://calblueprint.org) is a student-run organization at UC Berkeley devoted to technology for social good. Each semester, teams of 5 students work closely with a non-profit to develop pro-bono technological solutions to the problems they face every day.

Ruby on Rails
---
This application requires
- Ruby 2.4
- Rails 5.1.4

Getting Started
---

### Initial Set Up
```
git clone https://github.com/calblueprint/sjc.git
cd sjc

bundle install
```

Ensure your application is configured with the proper `application.yml` `database.yml` files. Start up your postgresql server then run:

```
rake db:create
rake db:migrate
rake db:seed
```

### Running Your Application

```
rails s 
```

Happy developing!
