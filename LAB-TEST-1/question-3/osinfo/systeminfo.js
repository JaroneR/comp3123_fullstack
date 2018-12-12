const os = require('os');

module.exports = {
    getSysteminfo: function(){
        cpu = os.arch();
        hostname = os.hostname();
        hostname = os.platform();
        
        return cpu+" "+hostname+ " "+osname;
    },
    getUserInfo: function(){
        usern = os.userInfo();
        hdir = os.userInfo();

        return usern.username+" "+hdir.homedir
    }
}
