## CourseFlow
**Project Description:**
<p>The CourseFlow frontend provides an interactive interface for students and instructors.
It allows users to browse courses, watch lessons, write reviews, and manage their learning progress.
Built with React, the app communicates seamlessly with a Django REST Framework backend.</p>

## Repository Description
It includes all React components, routing logic, and API integrations for displaying and managing course content.

## User Stories
**Instructor Stories:**

As an instructor, I want to create a new course, so I can share educational content.

As an instructor, I want to upload lessons (videos) to my courses, so students can learn.

As an instructor, I want to upload Cover Image to specific course.

As an instructor, I want to edit or delete my courses, so I can manage outdated content.

As an instructor, I want to edit or delete my lessons, so I can manage outdated content.

As an instructor, I want to see reviews, so I can improve course quality.


**Student Stories:**

As a student, I want to view a list of available courses, so I can choose what to learn.

As a student, I want to watch lessons for a specific course, so I can study online.

As a student, I want to leave reviews and ratings, so I can share my learning experience.

As a student, I want to see the overall course rating, so I can pick the best options.

As an student, I want to edit or delete my reviews.

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
        <tr><td>Docker</td><td>For containerized development and deployment.</td>
        <tr><td>Vite</td><td>for app bundling and local server</td>
    </tbody>
</table>


## Backend Repository 

[Backend](https://github.com/Ahmed-Hattan-2285/CourseFlow-backend).

## Deployed Site

[Live Demo](http://localhost:5173/).

### Installation & Setup (Using Docker)

**1. Clone the Repository**
```
git clone https://github.com/yourusername/CourseFlow-backend.git
cd CourseFlow-backend
```

**2. Create .env file**
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://postgres:password@db:5432/CourseFlow_db
ALLOWED_HOSTS=*
```

**3. Build & Run with Docker**
```
docker compose up --build
```

## RESTful Routing for CourseFlow

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
