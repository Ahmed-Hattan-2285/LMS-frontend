RESTful Routing for LMS

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
        <tr><td>/courses/:id/edit</td><td>{CourseFormPage}</td><td>Edit an existing course</td></tr>
        <tr><td>/courses/:id/delete</td><td>{CourseFormPage}</td><td>Remove a course (instructor only)</td></tr>
    </tbody>
</table>
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
        <tr><td>/course/:course_id/lessons/new</td><td>{LessonFormPage}</td><td>Form for instructors to add a new lesson</td></tr>
        <tr><td>/lessons/:id/edit</td><td>{LessonFormPage}</td><td>Edit an existing lesson</td></tr>
        <tr><td>/lessons/:id/delete</td><td>{LessonFormPage}</td><td>Remove a lesson (instructor only)</td></tr>
    </tbody>
</table>
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
    </tbody>
</table>
    </tbody>
</table>