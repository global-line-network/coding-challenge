/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlet;

import Controller.UserController;
import POJO.User;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author Mohammad
 */
public class NewUser extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //response.setContentType("text/html;charset=UTF-8");
        
        
                
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        response.setContentType("text/plain");
        //request.getContextPath()
        //final String UPLOAD_DIRECTORY = request.getContextPath() + "/images";
        final String UPLOAD_DIRECTORY = "D:\\javaee\\project\\fork\\coding-challenge\\users-crud\\web\\images";
        List<String> fields = new ArrayList<>();
        String avatarName = "";
        if(ServletFileUpload.isMultipartContent(request)){
            try {
                List<FileItem> multiparts = new ServletFileUpload(
                                         new DiskFileItemFactory()).parseRequest(request);
                for(FileItem item : multiparts){
                    if(!item.isFormField()){
                        File fileSaveDir = new File(UPLOAD_DIRECTORY);
                        if (!fileSaveDir.exists()) {
                            fileSaveDir.mkdir();
                        }
                        avatarName = new File(item.getName()).getName();
                        item.write(new File(UPLOAD_DIRECTORY + File.separator + avatarName));
                    }
                    else{
                        fields.add(item.getString());
                    }
                }
            } catch (Exception e) {
                // exception handling
            }
            
            String userName = fields.get(0);
            String userDate = fields.get(1);
            User user = new User(0, userName, userDate, avatarName);

            UserController userController = new UserController();
            boolean addToDB = userController.createUser(user);
             
            PrintWriter out = response.getWriter();
            out.print("{\"status\":" + addToDB + ", \"new-user\": { \"id\": \"" + user.getId() + "\", \"name\": \"" + user.getName() + "\", \"date\": \"" + user.getDate() + "\", \"image\": \"" + user.getImage() + "\" }}");
        }       

    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
