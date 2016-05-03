/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Kacper
 */
@Document(collection="categories")
public class Category {
    
    
    @Id
    private String _id;
    private List<String> children;
    private boolean isRoot;

    public Category(String _id, List<String> children, boolean isRoot) {
        this._id = _id;
        this.children = children;
        this.isRoot = isRoot;
    }

    public String getId() {
        return _id;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public List<String> getChildren() {
        return children;
    }

    public void setChildren(List<String> children) {
        this.children = children;
    }
    
    public boolean getIsRoot() {
        return isRoot;
    }
    
    public void setIsRoot(boolean isRoot) {
        this.isRoot = isRoot;
    }
}