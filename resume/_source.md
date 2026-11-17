# Bryan J Swift

mobile: +1-347-653-7492
email: bryan@bryanjswift.com
Washington, D.C. — open to remote, hybrid, on-site, or relocation

## Summary

Engineering leader with over twenty years of experience building software
across government contracting, global agencies, product design consultancies,
fintech, and live digital events. For the last five years I have architected
and built Little Cinema Digital's live events platform, powering sites for
clients including Netflix, Disney Entertainment, and Amazon. Along the way I
set the engineering practices for the organization and kept executive
leadership up to date on where projects stood and what needed to change. I have
led and mentored teams as an engineering manager and a director of engineering,
and I want to bring that experience, along with recent deep hands-on work, back
into engineering leadership.

## Human Skills

* Articulate technical problems and solutions to non-technical members of the
  team, business partners, and executive leadership
* Plot a course from current to desired state through creative solutions to
  achieve objectives on deadline
* Raise the bar for engineering practice across an organization, with or
  without formal authority
* Lead teams of designers and developers on outcome oriented projects from
  start to finish
* Mentor and coach engineers to grow their craft and their careers

## Technical Skills

### Platform & Infrastructure

* AWS serverless architecture using Lambda Functions and other managed services
* AWS CDK and CloudFormation for managing infrastructure as code
* GitHub Actions for continuous deployment, where every commit to `main` ships
  to production
* AWS X-Ray with custom span handling for observability

### Applications

* TypeScript and Remix for building fast, server side rendered web
  applications
* TypeScript GraphQL APIs, using Envelop and Nexus
* Rust Lambdas for performance sensitive workloads and fast cold start times
* PostgreSQL and DynamoDB for relational and key-value storage

### Video

* AWS MediaConvert and MediaPackage for processing and streaming high quality
  video to live event audiences

## Recent Job History

### Lead Software Engineer at Little Cinema Digital from May 2021

Little Cinema Digital is a digital agency that partners with brands to produce
live digital events built around interactivity and high quality video. Its
clients include Netflix, Disney Entertainment, and Amazon. LCD has twice been
chosen to produce Netflix's Upfronts, where Netflix previews its upcoming slate
to win over advertisers, and a critically important event on Netflix's business
calendar.

I joined to support client projects and went on to architect and build the
platform LCD now uses to create and run every site it produces. When I arrived,
each new client meant a new site cloned from a rigid template system. Those
sites were unreliable, struggled under the traffic spikes that come with
successful events, and the business had to turn away clients whose ideas didn't
fit the templates. I helped design and build a flexible content management
system tailored to LCD's business to enable the team to assemble reliable sites
with custom behavior without opening a code editor. Every event now runs on
proven, reusable components, which let LCD serve its existing clients with
confidence and expand into new markets. Each guest site is served in isolation,
so one event's traffic can never affect another's, and the platform has handled
events with as many as 150,000 concurrent guests, against a typical event of
around 1,000.

An event site's biggest moment is when a marketing push sends an audience to
it, and those were exactly the sites where we saw high bounce rates. We traced
much of the problem to initial load times of three to five seconds, well above
industry norms. I reworked how our sites were delivered, cut the initial
JavaScript payload and reduced the work done in the browser from that initial
payload, bringing initial load times under one second.

The platform is a Remix front end and a TypeScript GraphQL API running on AWS
Lambda, with Rust for the most performance sensitive paths. Data lives in
PostgreSQL and DynamoDB, and video is processed and streamed through AWS
MediaConvert and MediaPackage. Infrastructure is defined with CDK. Every commit
to `main` deploys to production through GitHub Actions, and AWS X-Ray with
custom spans shows us what is happening after deploy.

Beyond the code, I established development practices that brought a level of
rigor and discipline to software engineering at LCD that hadn't existed before.
I introduced TypeScript and taught the team to design systems around types,
which let us build faster with fewer defects. I also introduced Architecture
Decision Records, so every major platform change has a record of what we chose,
why, and which alternatives we considered and rejected. ADRs moved the team
from jumping straight into implementation to researching and discussing changes
first.

The engineering organization has ranged from fifteen people at its peak to
three today. As part of my responsibilities with the larger team, I onboarded
new engineers and mentored and coached the more junior of them. Throughout, I
have kept the CEO and CTO informed on where projects stand and what needs to
change, and worked closely with account, design, and executive stakeholders to
turn client ambitions into plans we can ship.

### Senior Manager, Engineering at United Income by Capital One from May 2020 until May 2021

United Income was a registered investment advisor, acquired by Capital One in
2019, that combined financial planning software with experienced wealth
advisors to provide personalized financial planning. I joined to lead,
mentor, and grow the engineering team.

I established a forum where engineers shared work in progress and got feedback
from their peers. I also worked with Capital One's enterprise identity teams to
design how United Income would integrate with Capital One's digital identity
system, so customers could sign in with their Capital One credentials.

### Technical Project Manager (Consultant) at Ticket Evolution from January 2020 until May 2020

Ticket Evolution (now part of Victory Live) is a broker to broker marketplace
where ticket brokers list their secondary market inventory. I joined as a
technical project manager, facilitating communication across teams and planning
and tracking work across multiple initiatives. When the COVID-19 pandemic set
off a cascade of postponed and cancelled events, I shifted to developing their
full stack JavaScript applications, focusing on keeping them maintainable for
the developers who would join next.

### Director of Engineering at Siberia, LLC from November 2014 until December 2019

Siberia is a product design consultancy. As a director of engineering, my role
was part consultant, part craftsperson, and part educator and coach. Day to
day, I did heads down implementation work, led the engineers on my projects,
stayed in touch with client contacts, and mentored and coached members of the
wider Siberia engineering organization.

Directors at Siberia take part in every stage of a client engagement, from
spotting an opportunity and pitching it, through execution and delivery, to
growing the relationship afterward. That meant executing skillfully as an
engineer while also understanding, and when needed leading, every step of the
product design and implementation process.

I led teams for clients ranging from startups to Fortune 500 companies,
including Google, Intel, Avis, Supreme, Playboy, and Buscemi, with a focus on
craft and meticulous execution. My work helped some of the world's most beloved
brands achieve their business goals and delight their customers.

### Earlier Experience

* **Independent Contractor**, February 2010 until December 2016: sole
  developer and staff augmentation for clients ranging from local restaurants
  to international agencies, working in Scala, Java (Android), PHP, and
  JavaScript
* **Senior Software Engineer at AKQA, Inc**, November 2006 until February 2010: grew
  from a Java developer into a polyglot developer with a deep appreciation for
  design and user experience
* **Systems Analyst at Devis**, June 2004 until November 2006: first role in
  software, where I grew from an individual contributor into a team member

## Education

### Bachelor of Science at Juniata College from August 2001 until May 2004

Earned my degree in Physics with Minors in Computer Science and Philosophy.
