statico
===================

This repo is is source code for statico.io marketing site and blog. It's a sample project to demonstrate how to build a fastest static site and blog with [jekyll](http://jekyllrb.com/) and [statico](https://statico.io/). 

Requirements
------------------
It require a standard java and ruby development environments. Here are the things you need:

* [Java 7+](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
 * Verify your installation: `java -version`
* [Ruby 2+](https://www.ruby-lang.org/en/installation/)
 * Verify your installation: `ruby -v`
* [Jekyll with rouge](http://jekyllrb.com/docs/installation/)
 * Verify your installation: `jekyll -v`
 * Windows user may need additional [steps](http://jekyllrb.com/docs/windows/) to install

Build Commands
------------------

* Default: `./optimizer`
 * clean build folder
 * generate jekyll static site
 * optimize generated site
* Development: `./optimizer dev`
 * shortcut to run `jekyll serve --watch` for local development
 * you may visit the local site at [http://0.0.0.0:7112/](http://0.0.0.0:7112/)
* Release: `./optimizer release`
 * clean build folder
 * generate jekyll static site
 * optimize generated site
 * upload the optimized files with gzip support to s3