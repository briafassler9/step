package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns user input from dropdown. */
@WebServlet("/food-data")
public class FoodDataServlet extends HttpServlet {

  private Map<String, Integer> foodVotes = new HashMap<>();
  private static String foodData = "food";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();
    String json = gson.toJson(foodVotes);
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String food = request.getParameter(foodData);
    int currentVotes = foodVotes.containsKey(food) ? foodVotes.get(food) : 0;
    foodVotes.put(food, currentVotes + 1);

    response.sendRedirect("/index.html");
  }
}