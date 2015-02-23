Welcome to the starlink wiki!

## How to Start

### 1. Register in Github and fork starlink repo
git clone https://github.com/StarLinkCo/starlink

### 2. Get to know meteor
* https://www.eventedmind.com/classes/getting-started-with-meteor/meteor-what-is-meteor

### 3. Install meteor
* https://www.meteor.com/install

### 4. Run these demos to get a basic idea of what meteor can do
* http://meteor-ionic.meteor.com/ 手机界面下需要的各种控件
* http://todone.meteor.com/  带tag标签的任务时间管理
* http://coffeescript-chat.meteor.com/  简单的文字聊天室
* http://svc.meteor.com/   简单的日历
* http://maodou.meteor.com  毛豆网已经实现的github登录功能(包含post,comments,vote功能)

### 5. Set up dev branch and merge back to master
* 1. git clone https://github.com/meteoric/demo.git
* 2. git branch dev-homepage
* 3. git checkout dev-homepage
* 4. vi both/router.js
* 5. git commit -a -m "Change logs"
* 6. git checkout master
* 7. git merge dev-homepage

### 6. Screensnaps
    li@MacbookAir ~/Github$ git clone https://github.com/meteoric/demo.git
    Cloning into 'demo'...
    remote: Counting objects: 377, done.
    remote: Total 377 (delta 0), reused 0 (delta 0)
    Receiving objects: 100% (377/377), 42.41 KiB | 0 bytes/s, done.
    Resolving deltas: 100% (171/171), done.
    Checking connectivity... done.
    li@MacbookAir ~/Github$ cd demo/
    li@MacbookAir ~/Github/demo$ ls
    LICENSE   README.md both    client    packages  server
    li@MacbookAir ~/Github/demo$ meteor
    [[[[[ ~/Github/demo ]]]]]                     

    => Started proxy.                             
    => Meteor 1.0.3.1 is available. Update this project with 'meteor update'.
    => Started MongoDB.                           
    => Errors prevented startup:    (Just Run one more time, it will be ok)

    li@MacbookAir ~/Github/demo$ meteor
    [[[[[ ~/Github/demo ]]]]]                     

    => Started proxy.                             
    => Meteor 1.0.3.1 is available. Update this project with 'meteor update'.
    => Started MongoDB.                           
    => Started your app.                          

    => App running at: http://localhost:3000/

#### set up a dev-xxx branch
    li@MacbookAir ~/Github/demo$ git branch dev-homepage
    li@MacbookAir ~/Github/demo$ git branch -a
      dev-homepage
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master
    li@MacbookAir ~/Github/demo$ git checkout dev-homepage
    Switched to branch 'dev-homepage'

#### change the default view to sideMenu
    li@MacbookAir ~/Github/demo$ vi both/router.js 
     14 Router.map(function() {
     15 //  this.route('index', {path: '/'});
     16   this.route('sideMenu', {path: '/'});
     17   this.route('actionSheet');
     18   this.route('backdrop');
     19   this.route('forms', {
     20     data: function () {
     21       return {
     22         post: Posts.find().fetch()[0]
     23       };
     24     }
     25   });
     26   this.route('headersFooters');
     27   this.route('lists');
     28   this.route('loading');
     29   this.route('modal');
     30   this.route('navigation');
     31   this.route('navigation.one', {path: '/navigation/one'});
     32   this.route('navigation.two', {path: '/navigation/two'});
     33   this.route('navigation.three', {path: '/navigation/three'});
     34   this.route('popover');
     35   this.route('popup');
     36 //  this.route('sideMenu');
     37   this.route('slideBox');
     38   this.route('tabs.one', {path: '/tabs/one', layoutTemplate: 'tabsLayout'});
     39   this.route('tabs.two', {path: '/tabs/two', layoutTemplate: 'tabsLayout'});
     40   this.route('tabs.three', {path: '/tabs/three', layoutTemplate: 'tabsLayout'});
     41   this.route('tabs.four', {path: '/tabs/four', layoutTemplate: 'tabsLayout'});
     42   this.route('userAccounts');
     43 });

#### commit your change to dev-xxx branch
    li@MacbookAir ~/Github/demo$ git commit -a -m "Change the default homepage to sideMenu"
    [dev-homepage a6dd4e7] Change the default homepage to sideMenu
     1 file changed, 3 insertions(+), 2 deletions(-)

#### merge the dev-xxx branch to master branch
     li@MacbookAir ~/Github/demo$ git branch -a
    * dev-homepage
      master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master
    li@MacbookAir ~/Github/demo$ git checkout master
    Switched to branch 'master'
    Your branch is up-to-date with 'origin/master'.
    li@MacbookAir ~/Github/demo$ git branch -a
      dev-homepage
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master
    li@MacbookAir ~/Github/demo$ git merge dev-homepage
    Updating f98ecca..a6dd4e7
    Fast-forward
     both/router.js | 5 +++--
     1 file changed, 3 insertions(+), 2 deletions(-)
    li@MacbookAir ~/Github/demo$ 

