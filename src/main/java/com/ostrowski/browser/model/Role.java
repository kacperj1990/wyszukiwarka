/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Kacper
 */
@Document(collection="roles")
public class Role {
    
    @Id
    private ObjectId _id;
    private String role;
    private String title;

    public Role(){}
    
    public Role(String role, String title) {
        this.role = role;
        this.title = title;
    }

    public String getRole() {
        return role;
    }

    public String getTitle() {
        return title;
    }
}
