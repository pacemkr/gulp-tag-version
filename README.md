gulp-tag-version
================

Tag git repository with current package version (gulp plugin).

It will read the `version` attribute (by default, override with `key` option) from the JSON stream (probably your `package.json` or `bower.json`), prefixes it with `"v"` (override with `prefix` option) and tags the repository with such created tagname (e.g. `v1.2.3`).


Example gulpfile
----------------

```js

// dependencies
var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version');

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json', './bower.json']) 
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version')) 

        // read only one file to get the version number
        .pipe(filter('package.json')) 
        // **tag it in the repository**
        .pipe(tag_version()) 
}

gulp.task('patch', function() { return inc('patch'); })
gulp.task('feature', function() { return inc('minor'); })
gulp.task('release', function() { return inc('major'); })
```

Thanks :beer:
--------

* to guys and gals from Fractal for [Gulp](http://gulpjs.com/) itself, obviously 
* to Steve Lacy (http://slacy.me) for creating [`gulp-bump`](https://github.com/stevelacy/gulp-bump) and [`gulp-git`](https://github.com/stevelacy/gulp-git) used here
* The main file structure is based on `gulp-bump` a bit as well (this is my first plugin :))

