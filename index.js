var map = require('map-stream'),
  gutil = require('gulp-util'),
  git = require('gulp-git');

module.exports = function(opts) {
  if(!opts) opts = {};
  if(!opts.key) opts.key = 'version';
  if(!opts.prefix) opts.prefix = 'v';
  if(typeof opts.push === 'undefined') opts.push = true;

  function modifyContents(file, cb) {

    if(file.isNull()) return cb(null, file);
    if(file.isStream()) return cb(new Error('gulp-vtag: streams not supported'));

    var json = JSON.parse(file.contents.toString()),
      currVer =  json[opts.key],
      tag = opts.prefix+currVer;
    gutil.log('Tagging as: '+gutil.colors.cyan('v'+json[opts.key]));
    git.tag(currVer, 'tagging as '+currVer);
    if (opts.push) git.push();
    cb(null, file);
  }


  return map(modifyContents);
};