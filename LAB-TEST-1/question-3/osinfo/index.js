var firewall = require('./firewall.js');
var sysinfo = require('./systeminfo.js');

sysinfo.getSysteminfo();
sysinfo.getUserInfo();
firewall.getStatuses();