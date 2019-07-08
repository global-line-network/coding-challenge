<%-- 
    Document   : newjsp
    Created on : Jul 5, 2019, 6:32:56 PM
    Author     : Mohammad
--%>

<%@page import="Controller.UserController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <base href="${pageContext.request.contextPath}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/all.css" type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css" type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css" type="text/css">

    <script src="${pageContext.request.contextPath}/js/jquery.js"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap.js"></script>
    <script src="${pageContext.request.contextPath}/js/main.js"></script>
</head>

<body>


    <div class="container">
        <img src="${pageContext.request.contextPath}/images/logo.png" class="rounded" alt="logo">
        <h1 class="mt-2">User Accounts</h1>

        <button type="button" class="mt-3 btn btn-primary" id="new-user" data-toggle="modal"
            data-target="#newUserModal">
            <i class="fa fa-plus mr-3"></i>Create New
        </button>

        <!-- Modal -->
        <div class="modal fade" id="newUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">User's Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="userForm" method="POST" action="#" enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="">User's Name:</label>
                                <input type="text" class="form-control" id="txt_user_name" name="txt_user_name">
                            </div>
                            <div class="form-group">
                                <label for="">User's Date:</label>
                                <input type="date" class="form-control" id="txt_user_date" name="txt_user_date">
                            </div>
                            <!-- COMPONENT START -->
                            <div class="form-group">
                                <div class="input-group input-file" name="file">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default btn-choose" type="button">Avatar</button>
                                    </span> <input type="text" class="form-control"
                                        placeholder='Choose a file...' /> <span class="input-group-btn">
                                        <button class="btn btn-warning btn-reset" type="button">Reset</button>
                                    </span>
                                </div>
                            </div>                 
                        </form>                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="uploadBtn">Upload and add to DB...</button>
                    </div>
                </div>
            </div>
        </div>

        
        <% UserController uc = new UserController(); %>
        <%= uc.getUsersView() %>
              
        
        
    </div>


</body>

</html>
