www.statico.io
==============

This is source code for [www.statico.io](http://www.statico.io/). It's a sample project to demonstrate how to build a fastest static website and blog with [jekyll](http://jekyllrb.com/) and [statico](http://www.statico.io/) optimization. 

Build Commands
------------------

* Default: `./optimizer`
 * clean build folder
 * generate jekyll static site
* Development: `./optimizer dev`
 * shortcut to run `jekyll serve --watch` for local development
 * you may visit the local site at [http://www.statico.io.127.0.0.1.xip.io:9001](http://www.statico.io.127.0.0.1.xip.io:9001)
* Release: `./optimizer release`
 * clean build folder
 * generate jekyll static site
 * optimize generated site
 * upload the optimized files with gzip support to s3
 
