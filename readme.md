#The Jobist

A [100 days project](http://thegreatdiscontent.com/100days). #100daysofthejobist

##Project Goals
* Create a friendly list of job search sites.
* Allow community input and curation.
* Match people to job openings
===
#Day 17
###Progress:
feature decision day.

###Plan:
outline features somewhere, like a roadmap? Via Github issues? Via feathub?

===
#Day 7
###Progress:
* Pretty solid grunt build
* Sites now have their own subpages in the /sites/ folder

###Today's progress brought to you by:
* http://handlebarsjs.com/
* http://bower.io/
* http://civilmusic.bandcamp.com/album/heartland-lp <- calling it: best album of 2015

###Plan:
* build sites into index page on build, not run
* build out a CRUD
* decide if all js should be one gigantic thing or nah
* think about removing dependancy on jquery and handlebars
* think about using normalize

===
#Days 4-6
* small amounts of grunt work

===
#Day 3
###Progress:
* ftp deploy via grunt, yay.
* setup a watch task
* created a pageres task to document the fun

###Today's progress brought to you by:
* https://www.npmjs.com/package/grunt-ftp-deploy
* https://www.npmjs.com/package/grunt-contrib-watch
* https://www.npmjs.com/package/grunt-pageres
* https://github.com/sindresorhus/pageres

###Plan:
* build out the multitude of pages based the data.json file

===
##Day 2
###Progress:
* Created a Gruntfile
* Configured Less + plugins
* Created a dev and prod task

###Today's progress brought to you by:
* https://www.npmjs.com/package/load-grunt-tasks
* https://www.npmjs.com/package/grunt-contrib-less
* http://lesscss.org/
* https://www.npmjs.com/package/less-plugin-autoprefix
* https://github.com/postcss/autoprefixer
* https://github.com/bassjobsen/less-plugin-group-css-media-queries
* https://www.npmjs.com/package/less-plugin-clean-css
* https://github.com/jakubpawlowicz/clean-css
* https://www.npmjs.com/package/grunt-compile-handlebars
* http://handlebarsjs.com/

===
##Day 1

###Progress:
* Found out that thejobist.com was returning a 404.
* Modified .htaccess to not break everything.
* Setup a github repo, https://github.com/crismanNoble/thejobist
* Setup a package.json
* Setup a subdomain, http://100.thejobist.com
* Setup a simple index file base on HTML5BP code
* Integrated Google analytics
* Spent too much time in the readme

###Plan:
* Going to rebuild the site starting with nothing but the existing data.json.
* Take a screenshot each day of the output.
* Write a short postmortem of each day.
* Minor rev each day

###Next Steps:
* Setup grunt
* Create an ftp task to sync the dist folder
* Create a pageres task to capture progress visually daily.
* Build `/dist` from a `/src`

###EOD Stats:
* 5 Requests, 48.8kb Transferred
* 15 Commits
* 7 files have changed and there have been 125 additions and 0 deletions.

###Timespent:
1hr

###Today's progress brought to you by
* http://daringfireball.net/projects/markdown/
* https://www.npmjs.com/
* https://html5boilerplate.com/
* https://jquery.org/
* http://gruntjs.com/
* https://nodejs.org/
* http://www.git-scm.com/
* https://github.com/

===
##Background
I had this idea long before I became a "professional" web developer, because I was looking for a web development role. Fast forward 3 years, I have a comfortable job making websites for a living. I have always been inspired by the idea of starting a "[Make something cool everyday.](https://www.behance.net/gallery/MSCED/976639)" type project. Plus [Michael Beruit is awesome](https://thegreatdiscontent.com/interview/michael-bierut) and assigns students to have [their own 100 days project](http://designobserver.com/feature/five-years-of-100-days/24678) which turns out amazing work. Plus I was thinking about how I have not been working on sideprojects. All of this culminated in my commitment to commit at least one commit on the jobist for the next 100 days. If I can't be bothered to get excited about the project beyond this experiment, then I give up on the jobist and will let the domain expire. If it is still awesome, I will keep it forever.

-April 8th, 2015
