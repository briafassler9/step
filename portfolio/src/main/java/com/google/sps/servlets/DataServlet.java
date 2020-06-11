// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/** Servlet that returns user comments. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private static String commentTable = "Comments";
  private static String commentCol = "comments";
  private static String timestampCol = "timestamp";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query commentQuery = new Query(commentTable).addSort(timestampCol, SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(commentQuery);
    
    List<String> commentForm = new ArrayList<String>();
    for (Entity entity : results.asIterable()) {
      String comments = (String) entity.getProperty(commentCol);
      long timestamp = (long) entity.getProperty(timestampCol);
      commentForm.add(comments);
    } 

    response.setContentType("application/json");
    String commentJSON = new Gson().toJson(commentForm);
    response.getWriter().println(commentJSON);
  }
  
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String comments = request.getParameter(commentCol);
    long timestamp = System.currentTimeMillis();
  
    Entity commentEntity = new Entity(commentTable);
    commentEntity.setProperty(commentCol, comments);
    commentEntity.setProperty(timestampCol, timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    response.sendRedirect("/index.html");
  }

  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}