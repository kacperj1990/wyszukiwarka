/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser.rest;

import com.ostrowski.browser.model.Role;
import com.ostrowski.browser.model.User;
import com.ostrowski.browser.repositories.RoleRepository;
import com.ostrowski.browser.repositories.UserRepository;
import java.util.List;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;

/**
 *
 * @author Kacper
 */
@org.springframework.web.bind.annotation.RestController
@Component
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public ResponseEntity<?> getRoles() {

        JSONObject json = new JSONObject();
        List<Role> roles = roleRepository.findAll();
        for (Role r : roles) {
            json.put(r.getRole(), r.getTitle());
        }

        return ResponseEntity.ok(json);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @RequestMapping(value = "/addNewUser", method = RequestMethod.POST)
    public ResponseEntity<?> addNewUser(@RequestBody User user) throws Exception {

        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(user.getUsername()));
        List<User> users = mongoTemplate.find(query, User.class);

        if (users.size() > 0) {
            throw new Exception("User exists");
        }

        BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder();
        user.setPassword(bcpe.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User added");
    }

    @RequestMapping(value = "/removeUser/{username}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeUser(@PathVariable("username") String username) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        List<User> users = mongoTemplate.find(query, User.class);
        if (users.size() == 1) {
            userRepository.delete(users.get(0));
            return ResponseEntity.ok("User deleted");
        } else {
            throw new Exception("User not found");
        }
    }

    @RequestMapping(value = "/editUser", method = RequestMethod.PUT)
    public ResponseEntity<?> editUser(@RequestBody User user) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(user.getUsername()));
        List<User> users = mongoTemplate.find(query, User.class);
        if (users.size() == 1) {
            User userToEdit = users.get(0);
            userToEdit.setFirstname(user.getFirstname());
            userToEdit.setLastname(user.getLastname());
            userToEdit.setRole(user.getRole());
            
            BCryptPasswordEncoder bcpe = new BCryptPasswordEncoder();
            String newPassword = bcpe.encode(user.getPassword());
            if(!newPassword.equals(userToEdit.getPassword())) {
                userToEdit.setPassword(bcpe.encode(user.getPassword()));
            }
            
            userRepository.save(userToEdit);
            
            return ResponseEntity.ok("User deleted");
        } else {
            throw new Exception("User not found");
        }
    }
}
