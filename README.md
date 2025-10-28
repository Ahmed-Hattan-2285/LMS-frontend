RESTful Routing for LMS

<h2>Frontend</h2>
<table border="1" width="100%">

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


<h2>Backend</h2>
<table border="1" width="100%">

<h2>Courses</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="15%">Entity</th>
            <th width="25%">HTTP Method</th>
            <th width="50%">Endpoint</th>
            <th width="50%">CRUD</th>
            <th width="10%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Courses</td><td>GET</td><td>/courses/</td><td>Read</td><td>Get all courses</td></tr>
        <tr><td>Courses</td><td>POST</td><td>/courses/</td><td>Create</td><td>Create new course</td></tr>
        <tr><td>Courses</td><td>GET</td><td>/courses/{id}</td><td>Read</td><td>Get one course by ID</td></tr>
        <tr><td>Courses</td><td>PUT</td><td>/courses/{id}/</td><td>Update</td><td>Update course info</td></tr>
        <tr><td>Courses</td><td>DELETE</td><td>/courses/{id}/</td><td>Delete</td><td>Delete a course</td></tr>
    </tbody>
</table>
    </tbody>
</table>

<h2>lessons</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="15%">Entity</th>
            <th width="25%">HTTP Method</th>
            <th width="50%">Endpoint</th>
            <th width="50%">CRUD</th>
            <th width="10%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>lessons</td><td>GET</td><td>/lessons/</td><td>Read</td><td>Get all lessons</td></tr>
        <tr><td>lessons</td><td>POST</td><td>/lessons/</td><td>Create</td><td>Create new lesson</td></tr>
        <tr><td>lessons</td><td>GET</td><td>/lessons/{id}</td><td>Read</td><td>Get one lesson by ID</td></tr>
        <tr><td>lessons</td><td>PUT</td><td>/lessons/{id}/</td><td>Update</td><td>Update lesson info</td></tr>
        <tr><td>lessons</td><td>DELETE</td><td>/lessons/{id}/</td><td>Delete</td><td>Delete a lesson</td></tr>
    </tbody>
</table>
    </tbody>
</table>

<h2>reviews</h2>
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="15%">Entity</th>
            <th width="25%">HTTP Method</th>
            <th width="50%">Endpoint</th>
            <th width="50%">CRUD</th>
            <th width="10%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>reviews</td><td>GET</td><td>/reviews/</td><td>Read</td><td>Get all reviews</td></tr>
        <tr><td>reviews</td><td>POST</td><td>/reviews/</td><td>Create</td><td>Create new review</td></tr>
        <tr><td>reviews</td><td>DELETE</td><td>/reviews/{id}/</td><td>Delete</td><td>Delete a review</td></tr>
    </tbody>
</table>
    </tbody>
</table>