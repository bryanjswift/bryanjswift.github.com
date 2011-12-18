--- 
layout: post
title: Using Git with a Multi-Branch Subversion Repository
tags: 
- thoughts
- git
- git-svn
- svn
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220284092"
  _edit_last: "2"
---
My place of employment is currently and in the foreseeable future married to SVN repositories which is not a problem so much as an inconvenience at times. I've recently been working with Git quite regularly and I have really come to appreciate the benefits of Git's branching and merging. Then even more recently (in the last couple weeks) I've been working with a repository which by necessity has multiple branches (more akin to Git forks) all being developed simultaneously and divergently but which had to be brought back in line with each other with some regularity. This responsibility of managing and merging divergent branches (forks) fell to me and so I spent quite some time wrestling with SVN merges and diffs and patches before feeling confident things were back in line.

Having dealt with this nightmare once I decided I didn't want to do it again if I didn't have to and so I started to look at git-svn. Once I had git-svn working on Tiger (which was a feat all on it's own) I just set out to get the trunk cloned which proved to be a simple matter of running <code>git-svn clone http://example.org/path/to/svn working-directory</code> and waiting for the process to finish. By default though this does not create branches and tags based on the svn standard structure:
<pre>
root
  |-- trunk
  |-- branches
  |-- tags
</pre>

I decided to investigate further because it seemed like this should be possible. As luck would have it the first thing I looked at was the man page for git-svn (which was also a pain to create as part of the compile process) which says "git-svn is especially useful when it comes to tracking repositories not organized in the way Subversion developers recommend (trunk, branches, tags directories)." which led me to believe it should be easy to track repositories which <em>are</em> organized the way Subversion developers recommend.

As it turns out it is pretty simple if you give git-svn the URL to the svn root and use some options to tell it where to find trunk, tags and branches it creates them all for you. With those flags the command becomes <code>git-svn clone http://example.org/path/to/svn -T trunk -t tags -b branches working-directory</code>. Now to switch between SVN branches you can use <code>git reset --hard remotes/branchName</code> or create git branches from the SVN branches by typing <code>git checkout -b gitBranchName remotes/svnBranchName</code>. In either case once your HEAD is set to a descendent of a branch created by git-svn executing <code>git-svn dcommit</code> sends the commits you have made in git to the SVN repository using the appropriate SVN location as determined (presumably) by the ancestry of your current HEAD.

For example I created a branch for trunk using <code>git checkout -b trunk remotes/trunk</code> and then made a change to a file and committed it to git's index. Then I create a branch for an SVN branch, <code>git checkout -b testBranch remotes/svnBranchName</code>, edit some files and then commit to git's index. Once I decide I'm ready to commit my changes to SVN I use <code>git-svn dcommit</code> and everything is sent to SVN.

I now have all the power of git's branching and merging in my SVN repository.

For information about migrating author information from an SVN repository to a new Git repository I recommend looking at <a href="http://github.com/guides/import-from-subversion" title="Import from Subversion - GitHub Guides">GitHub's guide to importing from Subversion</a>.
