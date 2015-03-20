Package.describe({
  name: "jamesfirst:linkedin",
  summary: "A OAuth2 wrapper for the LinkedIN API",
  version: "1.1.6",
  git: "https://github.com/StarLinkCo/meteor-linkedin"
});

Package.onUse(function(api) {

  api.use('oauth2@1.1.2', ['client', 'server']);
  api.use('oauth@1.1.3', ['client', 'server']);
  api.use('http@1.0.10', ['client', 'server']);
  api.use(['underscore@1.0.2', 'service-configuration@1.0.3'], ['client', 'server']);
  api.use(['random@1.0.2', 'templating@1.0.11'], 'client');
  api.use('mongo');

  api.addFiles('linkedin_connections.js', ['client', 'server']);
  api.addFiles(
    ['linkedin_configure.html', 'linkedin_configure.js'],
    'client');
  api.addFiles('linkedin_common.js', ['client', 'server']);
  api.addFiles('linkedin_server.js', 'server');
  api.addFiles('linkedin_client.js', 'client');

  api.export('LinkedIn');
  api.export('LinkedConnections', ['client', 'server']);
});

