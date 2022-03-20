## Question 1

For this question we want you to setup a page with a text field that we can use to get a list of jobs that having matching names.

So first we need a input box that will be a live search field. Typing anything into this field will begin the fetch of data from the server. However, it should not fetch any records until at least 3 characters have been entered. Clearing this field should clear the list of results.

We also need a loading indicator that will show up while the app is fetching results from the server.

And finally when the results are displayed we will need to see:

- The job’s name
- The start and end date of the job
- The name of the Contact assigned to the job

Note: We have provided a `service` prop to the component that is defined in /src/service/DataService.js. It has access to a graphql client and a http request library. If you wish to fetch data from the server we suggest you do it from there.

### What we're looking for

The goal of Question 1 is to see how candidates think through form submissions and what scenarios a user is likely to encounter whilst ensuring future maintainability of their solution. An example to demonstrate future maintainability is writing unit tests to validate the scenarios you have accounted for.

## Explain Implementation

### Question one

There is one thing I want to clarify on this question. I made a custom hook to search jobs that helps to maintain search logic easier. The hook gets the search request service and 2 other parameters to configure the delay time for debounce and the minimum number of characters to trigger a search.
Hook return:

- searchJobs: search function, the consumer can decide when to search and can also use the debounce function
- isLoading: loading state
- jobs: search results

### Question two

In question two, I created a helper function to find the activity and alocation of a resource. First, I populate activities and assignments by ID, then enrich the details by searching for the detailed data.

### Question three

In this question, I use scss to make the CSS cleaner. I also define some color variables and helper classes. They help keep CSS shorter and easier to update later.
I used flex box to help to keep the header and the main content responsive.
