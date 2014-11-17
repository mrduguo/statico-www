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
 

Web Page Test Speed Index
-------------------------

Desktop HTTP - San Jose, CA - Chrome - Cable - 488
http://www.webpagetest.org/result/141109_BD_G69/
http://www.webpagetest.org/result/141109_V0_VPC/ 0.393s	516
http://www.webpagetest.org/result/141111_31_D8A/ 0.390s	497

http://www.webpagetest.org/result/141111_KA_DQ0/ 0.482s	605

Mobile HTTP - San Jose, CA - Chrome - 3GFast - 1128
http://www.webpagetest.org/result/141109_KJ_GDC/
http://www.webpagetest.org/result/141109_CP_VPK/ 0.892s	1177
http://www.webpagetest.org/result/141111_G7_D3C/ 0.792s	1044
	
http://www.webpagetest.org/result/141111_MD_DT1/ 1.286s	1567
	http://www.webpagetest.org/result/141111_SX_E9H/
	http://www.webpagetest.org/result/141111_KM_E9E/
	http://www.webpagetest.org/result/141111_C9_E9D/
	http://www.webpagetest.org/result/141111_YQ_E9B/
	http://www.webpagetest.org/result/141111_DK_E98/


www.filamentgroup.com
http://www.webpagetest.org/result/141109_9C_GPC/   0.394s	483


Paul Irish • 10 months ago
My answer to how fast is fast enough? A Speed Index of under 1000.