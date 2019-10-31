<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="easyjobs-api-documentation">EasyJobs API Documentation</h1>
<p>This document is a draft for EasyJobs API Documentation, prepared for the second meeting. The endpoints are not exhaustive and are subject to change.</p>
<h1 id="user-endpoints">User Endpoints</h1>
<p>The following endpoints are used for fulfilling common user requests.</p>
<h2 id="signup">Signup</h2>
<p><strong>Description:</strong> Creates a new user given data<br>
<strong>Endpoint</strong> <code>POST v1/users/signup</code><br>
<strong>Payload</strong></p>
<pre><code>{
    "username": "string",
    "password": "string",
    "email": "string"
}
</code></pre>
<p><strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 201 and <code>User</code> object</li>
<li>HTTP Status Code 409 and <code>Error</code> object</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li><code>password</code> and <code>email</code> fields are going to get validated. Weak passwords and invalid emails will result in a <em>409 Conflict</em> response.</li>
</ul>
<h2 id="create-profile">Create Profile</h2>
<p><code>Authentication token is required for this endpoint</code><br>
<strong>Description:</strong> Sends a request for the initial set-up for a user profile<br>
<strong>Endpoint</strong> <code>POST /v1/users/profile</code><br>
<strong>Payload</strong><br>
<code>UserProfile</code> object<br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 201 and <code>User</code> object</li>
</ul>
<h2 id="get-user">Get User</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Returns the information about a user<br>
<strong>Endpoint</strong> <code>GET /v1/users/:user_id/</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>User</code> object</li>
<li>HTTP Status Code 200 and <code>SimpleUser</code> object<br>
<strong>Note(s):</strong></li>
<li>If no <code>user_id</code> is passed and request has a user authentication token header, returns a detailed <code>User</code> object reflecting the authenticated user’s data.</li>
<li>If <code>user_id</code> is passed, returns a <code>SimpleUser</code> object.</li>
</ul>
<h2 id="update-user">Update User</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Updates user information according to the given changes<br>
<strong>Endpoint</strong> <code>PATCH /v1/users/</code><br>
<strong>Payload</strong><br>
<code>User</code> object<br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>User</code> object</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>Payload does not have to contain unchanged fields of the <code>User</code> object.</li>
</ul>
<h2 id="delete-user">Delete User</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Deletes the data related to the authenticated user<br>
<strong>Endpoint</strong> <code>DELETE /v1/users/</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 204</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>For data integrity and profile recovery requests, user related data will not physically get removed from the database for a set amount of time.</li>
</ul>
<h2 id="change-password">Change Password</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong>: Changes the password of authenticated user<br>
<strong>Endpoint</strong> <code>PATCH /v1/users/me/password/change</code><br>
<strong>Payload</strong></p>
<pre><code>{
    "old_password": "string",
    "new_password": "string"
}
</code></pre>
<p><strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>User</code> object</li>
</ul>
<h2 id="password-reset-request">Password Reset Request</h2>
<p><strong>Description:</strong> Sends a request marking the beginning of Password Recovery Routine<br>
<strong>Endpoint</strong> <code>POST /v1/users/me/password/forgot</code><br>
<strong>Payload</strong></p>
<pre><code>{
	"user_identifier": "string"
}
</code></pre>
<p><strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>For user privacy, response is always <em>200 OK</em>.</li>
<li><code>user_identifier</code>can either be a username or an email.</li>
</ul>
<h2 id="change-password-with-reset-key">Change Password with Reset Key</h2>
<p><strong>Description:</strong> Sends a request to change password with the reset key sent via e-mail<br>
<strong>Endpoint</strong> <code>POST /v1/users/password/reset</code><br>
<strong>Payload</strong></p>
<pre><code>{
	"key": "string"
    "password": "string"
}
</code></pre>
<p><strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200</li>
<li>HTTP Status Code 400 and <code>Error</code> object</li>
<li>HTTP Status Code 404 and <code>Error</code> object</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>Sending a bad password will result in <em>400 Bad Request</em>.</li>
<li>Sending an invalid key will result in <em>404 Not Found</em>.</li>
</ul>
<h1 id="company-endpoints">Company Endpoints</h1>
<p>The following endpoints are used for fulfilling company requests.</p>
<h2 id="register-new-company">Register New Company</h2>
<p><strong>Description:</strong> Register a new company to the system<br>
<strong>Endpoint</strong> <code>POST v1/companies/register</code><br>
<strong>Payload</strong></p>
<pre><code>{
    "companyname": "string",
    "password": "string",
    "email": "string"
}
</code></pre>
<p><strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 201 and <code>Company</code> object</li>
<li>HTTP Status Code 409 and <code>Error</code> object</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li><code>password</code> and <code>email</code> are going to get validated. Weak passwords and invalid emails 			  will result in a <em>409 Conflict</em> response.</li>
</ul>
<h2 id="create-company-profile">Create Company Profile</h2>
<p><code>Authentication token is required for this endpoint</code><br>
<strong>Description:</strong> Creates a new company according to the given data<br>
<strong>Endpoint</strong> <code>POST /v1/companies/profile</code><br>
<strong>Payload</strong><br>
<code>CompanyProfile</code> object<br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 201 and <code>Company</code> object</li>
</ul>
<h2 id="get-company-profile">Get Company Profile</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Returns the information about a user<br>
<strong>Endpoint</strong> <code>GET /v1/companies/profile/:company_id</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>Company</code> object</li>
<li>HTTP Status Code 200 and <code>SimpleCompany</code> object<br>
<strong>Note(s):</strong></li>
<li>If no <code>company_id</code> is passed and request has a company authentication token header, returns a	detailed <code>Company</code> object reflecting the authenticated company’s data.</li>
<li>If <code>company_id</code> is passed, returns a <code>SimpleCompany</code> object.</li>
</ul>
<h2 id="update-company-profile">Update Company Profile</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Updates company information according to the given changes<br>
<strong>Endpoint</strong> <code>PATCH /v1/companies/profile</code><br>
<strong>Payload</strong><br>
<code>CompanyProfile</code> object<br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>Company</code> object</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>Payload does not have to contain unchanged fields of the <code>CompanyProfile</code> object.</li>
</ul>
<h2 id="delete-company-profile">Delete Company Profile</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Deletes the data related to the authenticated company<br>
<strong>Endpoint</strong> <code>DELETE /v1/companies/profile</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 204</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>For data integrity and profile recovery requests, company related data will not physically get removed from the database for a set amount of time.</li>
</ul>
<h2 id="create-advertisement">Create Advertisement</h2>
<p><code>Authentication token is required for this endpoint</code><br>
<strong>Description:</strong> Creates a new job advertisement for the authenticated company<br>
<strong>Endpoint</strong> <code>POST /v1/advertisements</code><br>
<strong>Payload</strong><br>
<code>Advertisement</code> object<br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200</li>
</ul>
<h2 id="get-advertisements">Get Advertisement(s)</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Returns the advertisement(s) belonging to the authenticated company<br>
<strong>Endpoint</strong> <code>GET /v1/advertisements/:advertisement_id</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>Advertisement</code> object</li>
<li>HTTP Status Code 200 and list of <code>Advertisement</code> objects<br>
<strong>Note(s):</strong></li>
<li>If no <code>advertisement_id</code> is passed and the request has a company authentication token header, returns a list of  <code>Advertisement</code> objects, containing all the company’s advertisements.</li>
<li>If <code>advertisement_id</code> is passed, returns a <code>Advertisement</code> object.</li>
</ul>
<h2 id="update-advertisement">Update Advertisement</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Updates an advertisement belonging to the authenticated company<br>
<strong>Endpoint</strong> <code>PATCH /v1/advertisements/:advertisement_id</code><br>
<strong>Payload</strong><br>
<code>Advertisement</code> object<br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>Advertisement</code> object</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>Payload does not have to contain unchanged fields of the <code>Advertisement</code> object.</li>
</ul>
<h2 id="delete-advertisement">Delete Advertisement</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Deletes the data related to the authenticated user<br>
<strong>Endpoint</strong> <code>DELETE /v1/advertisements/:advertisement_id</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 204</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>Old advertisements will be marked as ‘deleted’ on the database and won’t show up on search results but won’t get physically removed.</li>
</ul>
<h1 id="advertisement-endpoints">Advertisement Endpoints</h1>
<p>The following endpoints are used for fulfilling job application requests.</p>
<h2 id="get-job-advertisement-list">Get Job Advertisement List</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Returns a job advertisement list based on passed parameters for the user<br>
<strong>Endpoint</strong> <code>GET /v1/advertisements/?query=:params</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and list of <code>SimpleAdvertisement</code> objects<br>
<strong>Note(s):</strong></li>
<li>If no <code>params</code> are passed, returns a list of  <code>SimpleAdvertisement</code> objects based on the Match Algorithm.</li>
<li>If <code>params</code> are passed, returns a list of  <code>SimpleAdvertisement</code> objects based on the search parameters.</li>
</ul>
<h2 id="get-a-job-advertisements-details">Get a Job Advertisement’s Details</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Returns a job advertisement’s details for the user<br>
<strong>Endpoint</strong> <code>GET /v1/advertisements/:advertisement_id</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and <code>Advertisement</code> object</li>
</ul>
<h2 id="apply-for-a-job">Apply for a Job</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Sends a job application request to a company made by the user<br>
<strong>Endpoint</strong> <code>GET /v1/advertisements/:advertisement_id/apply</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200</li>
</ul>
<p><strong>Note(s):</strong></p>
<ul>
<li>Using the authentication token in the header, reaching this endpoint initiates Application Routine from the applicant’s part</li>
</ul>
<h2 id="get-recommended-users-list">Get Recommended Users List</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Returns a list of users who are suitable for the authenticated company’s needs<br>
<strong>Endpoint</strong> <code>GET /v1/advertisements/:advertisement_id/recommended</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200 and a list of <code>User</code> objects</li>
<li></li>
</ul>
<h2 id="hire-a-user">Hire a User</h2>
<p><code>Authentication token is required for this endpoint</code></p>
<p><strong>Description:</strong> Sends a push notification to the specified user to initiate Application Routine on behalf of the authenticated company<br>
<strong>Endpoint</strong> <code>GET /v1/advertisements/:advertisement_id/hire</code><br>
<strong>Response(s):</strong></p>
<ul>
<li>HTTP Status Code 200</li>
</ul>
<h1 id="objects">Objects</h1>
<p>This section provides the content of the objects used for front-end communication. As database design progresses, this exhaustive objects list will get filled out.</p>
<h2 id="user"><code>User</code></h2>
<pre><code>{
 "username": "string"
 "email": "string"
 "profile": {
     ...
 }
 "isValidated" : "boolean"
 "comments": []
}
</code></pre>
<h2 id="simpleuser"><code>SimpleUser</code></h2>
<pre><code>{
 "email": "string"
 "profile": {
     ...
 }
}
</code></pre>
<h2 id="userprofile"><code>UserProfile</code></h2>
<pre><code>{
 "name": "string"
 "surname": "string"
 "birthDate": "date"
 "picture": "image"
 "profession": {
 	...
 }
 "skills":[]
 "experience":[]
}
</code></pre>
<h2 id="company"><code>Company</code></h2>
<pre><code>{
 "username": "string"
 "email": "string"
 "profile": {
 	...
 	}
 "isValidated": "boolean"
 "applications": []
}
</code></pre>
<h2 id="simplecompany"><code>SimpleCompany</code></h2>
<pre><code>{
 "email": "string"
 "profile": {
 	...
 	}
}
</code></pre>
<h2 id="companyprofile"><code>CompanyProfile</code></h2>
<pre><code>{
 "name": "string"
 "picture": "image"
 "description": "string"
 "location": "location"
 "comments": []
 "foundedAt": "date"
}
</code></pre>
<h2 id="advertisement"><code>Advertisement</code></h2>
<pre><code>{
 "company": {
 	...
 }
 "publishDate": "date"
 "validUntil": "date"
 "description": "string"
 "requirements": []
 "comments": []
 "position": {
 	...
 }
}
</code></pre>
<h2 id="simpleadvertisement"><code>SimpleAdvertisement</code></h2>
<pre><code>{
 "company": {
 	...
 }
 "publishDate": "date"
 "description": "string"
 "position": {
 	...
 }
}
</code></pre>
<h2 id="error"><code>Error</code></h2>
<pre><code>{
 "code": "integer"
 "description": "string"
}
</code></pre>
</div>
</body>

</html>
