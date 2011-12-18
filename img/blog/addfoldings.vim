" Plugin to create a folding for every { } pair
" Last Change:		2008 May 20
" Maintainer:			Bryan J Swift
" License:	This file is placed in the public domain.

if exists("b:did_jsfoldings")
	finish
endif
let b:did_jsfoldings = 1

execute "normal gg"
while search("{","W") > 0
	execute "normal zf%"
	execute "normal zo"
endwhile
execute "normal gg"
