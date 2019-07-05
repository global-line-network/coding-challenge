<%-- 
    Document   : newjsp
    Created on : Jul 5, 2019, 6:32:56 PM
    Author     : Mohammad
--%>

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
                        <div class="form-group">
                            <label for="">User's Name:</label>
                            <input type="text" class="form-control" name="txt_user_name">
                        </div>
                        <div class="form-group">
                            <label for="">User's Date:</label>
                            <input type="text" class="form-control" name="txt_user_date">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Add To DB...</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="user-info mt-4">
                    <img src="${pageContext.request.contextPath}/images/1.jpg" alt="">

                    <h2 class="user-name">Ryan Graves</h2>
                    <input type="text" name="txt_name" value="Ryan Graves" class="form-control txt-edit txt-name">
                    <h4 class="user-date">15-02-2019</h4>
                    <input type="text" name="txt_date" value="15-02-2019" class="form-control txt-edit txt-date">

                    <!-- action buttons -->
                    <a href="#" class="btn btn-outline-secondary action edit"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-outline-secondary action delete"><i class="fa fa-trash-alt"></i></a>

                    <!-- confirm buttons -->
                    <a href="#" class="btn btn-success text-white confirm send"><i class="fa fa-check"></i></a>
                    <a href="#" class="btn btn-danger text-white confirm cancel"><i class="fa fa-times"></i></a>
                </div>
            </div>
            <div class="col">
                <div class="user-info mt-4">
                    <img src="${pageContext.request.contextPath}/images/2.jpg" alt="">

                    <h2 class="user-name">Ryan Graves</h2>
                    <input type="text" name="txt_name" value="Ryan Graves" class="form-control txt-edit txt-name">
                    <h4 class="user-date">15-02-2019</h4>
                    <input type="text" name="txt_date" value="15-02-2019" class="form-control txt-edit txt-date">

                    <!-- action buttons -->
                    <a href="#" class="btn btn-outline-secondary action edit"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-outline-secondary action delete"><i class="fa fa-trash-alt"></i></a>

                    <!-- confirm buttons -->
                    <a href="#" class="btn btn-success text-white confirm send"><i class="fa fa-check"></i></a>
                    <a href="#" class="btn btn-danger text-white confirm cancel"><i class="fa fa-times"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="user-info mt-4">
                    <img src="${pageContext.request.contextPath}/images/3.jpg" alt="">

                    <h2 class="user-name">Ryan Graves</h2>
                    <input type="text" name="txt_name" value="Ryan Graves" class="form-control txt-edit txt-name">
                    <h4 class="user-date">15-02-2019</h4>
                    <input type="text" name="txt_date" value="15-02-2019" class="form-control txt-edit txt-date">

                    <!-- action buttons -->
                    <a href="#" class="btn btn-outline-secondary action edit"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-outline-secondary action delete"><i class="fa fa-trash-alt"></i></a>

                    <!-- confirm buttons -->
                    <a href="#" class="btn btn-success text-white confirm send"><i class="fa fa-check"></i></a>
                    <a href="#" class="btn btn-danger text-white confirm cancel"><i class="fa fa-times"></i></a>
                </div>
            </div>
            <div class="col">
                <div class="user-info mt-4">
                    <img src="${pageContext.request.contextPath}/images/4.jpg" alt="">

                    <h2 class="user-name">Ryan Graves</h2>
                    <input type="text" name="txt_name" value="Ryan Graves" class="form-control txt-edit txt-name">
                    <h4 class="user-date">15-02-2019</h4>
                    <input type="text" name="txt_date" value="15-02-2019" class="form-control txt-edit txt-date">

                    <!-- action buttons -->
                    <a href="#" class="btn btn-outline-secondary action edit"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-outline-secondary action delete"><i class="fa fa-trash-alt"></i></a>

                    <!-- confirm buttons -->
                    <a href="#" class="btn btn-success text-white confirm send"><i class="fa fa-check"></i></a>
                    <a href="#" class="btn btn-danger text-white confirm cancel"><i class="fa fa-times"></i></a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="user-info mt-4">
                    <img src="${pageContext.request.contextPath}/images/5.jpg" alt="">

                    <h2 class="user-name">Ryan Graves</h2>
                    <input type="text" name="txt_name" value="Ryan Graves" class="form-control txt-edit txt-name">
                    <h4 class="user-date">15-02-2019</h4>
                    <input type="text" name="txt_date" value="15-02-2019" class="form-control txt-edit txt-date">

                    <!-- action buttons -->
                    <a href="#" class="btn btn-outline-secondary action edit"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-outline-secondary action delete"><i class="fa fa-trash-alt"></i></a>

                    <!-- confirm buttons -->
                    <a href="#" class="btn btn-success text-white confirm send"><i class="fa fa-check"></i></a>
                    <a href="#" class="btn btn-danger text-white confirm cancel"><i class="fa fa-times"></i></a>
                </div>
            </div>
            <div class="col">
                <div class="user-info mt-4">
                    <img src="${pageContext.request.contextPath}/images/7.jpg" alt="">

                    <h2 class="user-name">Ryan Graves</h2>
                    <input type="text" name="txt_name" value="Ryan Graves" class="form-control txt-edit txt-name">
                    <h4 class="user-date">15-02-2019</h4>
                    <input type="text" name="txt_date" value="15-02-2019" class="form-control txt-edit txt-date">

                    <!-- action buttons -->
                    <a href="#" class="btn btn-outline-secondary action edit"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-outline-secondary action delete"><i class="fa fa-trash-alt"></i></a>

                    <!-- confirm buttons -->
                    <a href="#" class="btn btn-success text-white confirm send"><i class="fa fa-check"></i></a>
                    <a href="#" class="btn btn-danger text-white confirm cancel"><i class="fa fa-times"></i></a>
                </div>
            </div>
        </div>
    </div>


</body>

</html>
