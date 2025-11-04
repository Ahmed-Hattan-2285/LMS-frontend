## Learning Management System
<p>A web-based Learning Management System (LMS) that allows instructors to create and manage online courses while enabling students to enroll, watch lessons, and leave Reviews and Rating.</p>

## Tech Stack
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="6%">Technology</th>
            <th width="55%">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>React</td><td>For building a dynamic and responsive user interface.</td>
        <tr><td>CSS</td><td>Structure and styling of the web pages.</td>
        <tr><td>React Router</td><td>For handling navigation between pages.</td>
    </tbody>
</table>


## Backend Link 

[Backend](https://github.com/Ahmed-Hattan-2285/LMS-backend).

## Link to Deployed Site 

[Deployed](http://localhost:5173/).

## RESTful Routing for LMS

<h2>Profile</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="6%">Route path</th>
            <th width="15%">Element</th>
            <th width="100%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>/signup</td><td>{SignupPage}</td><td>User can SignUp</td></tr>
        <tr><td>/login/:id</td><td>{AuthPage}</td><td>User can LogIn</td></tr>
    </tbody>
</table>

<h2>Courses</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="6%">Route path</th>
            <th width="15%">Element</th>
            <th width="100%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>/courses</td><td>{CoursesIndexPage}</td><td>View all courses</td></tr>
        <tr><td>/courses/:id</td><td>{CourseDetailPage}</td><td>Show course details and its lessons</td></tr>
        <tr><td>/courses/new</td><td>{CourseFormPage}</td><td>Form for instructors to add a new course</td></tr>
        <tr><td>/courses/:id/edit</td><td>{CourseFormPage}</td><td>Edit an existing course (instructor only)</td></tr>
        <tr><td>/courses/confirm_delete/:id</td><td>{CourseFormPage}</td><td>Remove a course (instructor only)</td></tr>
    </tbody>
</table>

<h2>Lessons</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="6%">Route path</th>
            <th width="15%">Element</th>
            <th width="100%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>/lessons/:id</td><td>{LessonDetailPage}</td><td>Show lesson details and its lessons</td></tr>
        <tr><td>/courses/:id/lessons/new</td><td>{LessonFormPage}</td><td>Form for instructors to add a new lesson</td></tr>
        <tr><td>/lessons/:id/edit</td><td>{LessonFormPage}</td><td>Edit an existing lesson (instructor only)</td></tr>
        <tr><td>/lessons/:id/delete</td><td>{LessonFormPage}</td><td>Remove a lesson (instructor only)</td></tr>
    </tbody>
</table>

<h2>Reviews</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="6%">Route path</th>
            <th width="15%">Element</th>
            <th width="100%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>/reviews</td><td>{ReviewsIndexPage}</td><td>View all reviews</td></tr>
        <tr><td>/reviews/new</td><td>{ReviewFormPage}</td><td>Form for Student to add a new review</td></tr>
        <tr><td>/reviews/:id/edit</td><td>{ReviewFormPage}</td><td>Form for Student to Edit an existing review</td></tr>
        <tr><td>/reviews/:id/delete</td><td>{ReviewFormPage}</td><td>Form for Student to Remove a review</td></tr>
    </tbody>
</table>

### IceBox Features

- **Dark / Light Mode Toggle** – Allow users to switch between light and dark themes for better accessibility.

- **Progress Tracking Dashboard** – Visual graphs to show students’ course completion and progress over time.

- **Notifications System** – Real-time alerts for new lessons, comments, or instructor messages.

- **Search and Filter Bar** – Advanced search to filter courses by difficulty, category, or instructor.

- **Responsive Mobile App UI** – Optimized layout and controls for mobile users.